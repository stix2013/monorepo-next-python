import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import tensorflow as tf
from py_finance import get_stock_history
import os

class StockForecaster:
    def __init__(self, symbol: str, lookback_days: int = 60):
        self.symbol = symbol.upper()
        self.lookback_days = lookback_days
        self.model = None
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        self.model_path = f"models/{self.symbol}_forecast_model.keras"
        
        # Create models directory if it doesn't exist
        os.makedirs("models", exist_ok=True)
    
    def _prepare_data(self, data: pd.DataFrame):
        """Prepare data for model training/prediction"""
        # Use only closing prices
        prices = data['close'].values.reshape(-1, 1)
        scaled_data = self.scaler.fit_transform(prices)
        
        X, y = [], []
        for i in range(self.lookback_days, len(scaled_data)):
            X.append(scaled_data[i-self.lookback_days:i, 0])
            y.append(scaled_data[i, 0])
        
        return np.array(X), np.array(y)
    
    def build_model(self):
        """Build LSTM model"""
        model = tf.keras.Sequential([
            tf.keras.layers.LSTM(50, return_sequences=True, input_shape=(self.lookback_days, 1)),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.LSTM(50, return_sequences=False),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(25),
            tf.keras.layers.Dense(1)
        ])
        
        model.compile(optimizer='adam', loss='mean_squared_error')
        return model
    
    def train(self, period: str = "2y"):
        """Train model on historical data"""
        # Fetch historical data
        print(f"Symbol: {self.symbol}, Period: {period} ")

        stock_data = get_stock_history(self.symbol, period)
        df = pd.DataFrame([d.dict() for d in stock_data.data])
        
        X, y = self._prepare_data(df)
        
        # Reshape for LSTM (samples, timesteps, features)
        X = X.reshape(X.shape[0], X.shape[1], 1)
        
        # Split into train/test
        split = int(0.8 * len(X))
        X_train, X_test = X[:split], X[split:]
        y_train, y_test = y[:split], y[split:]
        
        # Build and train model
        self.model = self.build_model()
        
        # Early stopping to prevent overfitting
        early_stop = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
        
        self.model.fit(
            X_train, y_train,
            validation_data=(X_test, y_test),
            epochs=50,
            batch_size=32,
            callbacks=[early_stop],
            verbose=0
        )
        
        # Save model
        self.model.save(self.model_path)
        
        return {
            "message": f"Model trained for {self.symbol}",
            "train_samples": len(X_train),
            "test_samples": len(X_test),
            "final_loss": float(self.model.evaluate(X_test, y_test, verbose=0))
        }
    
    def predict_next_day(self, period: str = "2y"):
        """Predict next day's closing price"""
        # Load model if exists, otherwise train it
        if os.path.exists(self.model_path):
            self.model = tf.keras.models.load_model(self.model_path)
        else:
            self.train(period)
        
        # Fetch recent data
        stock_data = get_stock_history(self.symbol, period)
        df = pd.DataFrame([d.dict() for d in stock_data.data])
        
        # Prepare last 60 days
        prices = df['close'].values.reshape(-1, 1)
        self.scaler.fit(prices)
        
        last_60_days = prices[-self.lookback_days:]
        last_60_days_scaled = self.scaler.transform(last_60_days)
        
        X_test = np.array([last_60_days_scaled])
        X_test = X_test.reshape(1, self.lookback_days, 1)
        
        # Predict
        predicted_price_scaled = self.model.predict(X_test, verbose=0)
        predicted_price = self.scaler.inverse_transform(predicted_price_scaled)[0][0]
        
        # Calculate confidence interval (simple approach)
        residuals = prices[-30:] - self.scaler.inverse_transform(
            self.model.predict(X_test.reshape(1, self.lookback_days, 1), verbose=0)
        )
        std_dev = np.std(residuals) if len(residuals) > 0 else 0
        
        return {
            "symbol": self.symbol,
            "predicted_price": float(predicted_price),
            "currency": stock_data.native_currency,
            "confidence_interval": {
                "lower": float(predicted_price - 2 * std_dev),
                "upper": float(predicted_price + 2 * std_dev)
            },
            "prediction_date": (pd.Timestamp.now() + pd.Timedelta(days=1)).strftime('%Y-%m-%d')
        }
    
if __name__ == "__main__":
    forecaster = StockForecaster("AAPL")
    # print(forecaster.train())
    print(forecaster.predict_next_day())