import os
import random
import pandas as pd
import numpy as np

# Set random seed for reproducibility
random.seed(42)
np.random.seed(42)

data_path = os.path.join(os.path.dirname(__file__), "..", "Data", "Heart Prediction Quantum Dataset.csv")
df = pd.read_csv(data_path)
print(f"Original dataset shape: {df.shape}")
print(f"Original age range: {df['Age'].min()} to {df['Age'].max()}")

# Generate 100 realistic patient rows for ages 18 to 29
young_rows = []
for _ in range(100):
    age = random.randint(18, 29)
    gender = random.choice([0, 1])
    
    # 85% normal baseline, 15% elevated risk factor
    if random.random() < 0.85:
        bp = int(np.random.normal(115, 8))
        chol = int(np.random.normal(175, 20))
        hr = int(np.random.normal(72, 9))
        disease = 0
    else:
        # Elevated/borderline young adult case (familial or lifestyle)
        bp = int(np.random.normal(138, 12))
        chol = int(np.random.normal(235, 25))
        hr = int(np.random.normal(88, 10))
        disease = 1 if (bp > 140 and chol > 240) else 0

    bp = max(85, min(180, bp))
    chol = max(110, min(320, chol))
    hr = max(45, min(130, hr))
    quantum_pattern = round(float(np.random.normal(8.5, 0.8)), 9)

    young_rows.append({
        'Age': age,
        'Gender': gender,
        'BloodPressure': bp,
        'Cholesterol': chol,
        'HeartRate': hr,
        'QuantumPatternFeature': quantum_pattern,
        'HeartDisease': disease
    })

df_young = pd.DataFrame(young_rows)
df_augmented = pd.concat([df, df_young], ignore_index=True)

print(f"Augmented dataset shape: {df_augmented.shape}")
print(f"New age range: {df_augmented['Age'].min()} to {df_augmented['Age'].max()}")
print(f"Young adult disease incidence: {df_young['HeartDisease'].value_counts().to_dict()}")

df_augmented.to_csv(data_path, index=False)
print(f"Successfully saved augmented dataset to: {data_path}")
