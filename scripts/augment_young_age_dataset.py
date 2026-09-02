import os
import random
import pandas as pd
import numpy as np

# Set random seed for reproducibility
random.seed(42)
np.random.seed(42)

data_path = os.path.join(os.path.dirname(__file__), "..", "Data", "Heart Prediction Quantum Dataset.csv")

# Load original base data (first 500 rows if previously augmented)
df_all = pd.read_csv(data_path)
if len(df_all) > 500:
    df_base = df_all.iloc[:500]
else:
    df_base = df_all

print(f"Base dataset shape: {df_base.shape}")

# Generate 150 clinically sound records for ages 18 to 29
young_rows = []
for _ in range(150):
    age = random.randint(18, 29)
    gender = random.choice([0, 1])
    
    # Mix of scenarios:
    # 50% fully healthy young adults (low BP, low Chol, normal HR) -> Disease 0
    # 25% isolated high cholesterol / familial hypercholesterolemia (Chol > 230) -> Disease 1 / elevated
    # 15% isolated hypertension (BP > 140) or high heart rate (HR > 105) -> Disease 1 / elevated
    # 10% multi-risk young adults (high BP + high Chol) -> Disease 1
    r = random.random()
    if r < 0.50:
        # Healthy young adult
        bp = int(np.random.normal(114, 7))
        chol = int(np.random.normal(170, 18))
        hr = int(np.random.normal(68, 8))
        disease = 0
    elif r < 0.75:
        # High cholesterol young adult (Familial / Dietary)
        bp = int(np.random.normal(122, 10))
        chol = int(np.random.normal(260, 22))
        hr = int(np.random.normal(78, 12))
        disease = 1 if chol >= 240 else 0
    elif r < 0.90:
        # Elevated BP / Tachycardia young adult
        bp = int(np.random.normal(148, 12))
        chol = int(np.random.normal(195, 20))
        hr = int(np.random.normal(110, 12))
        disease = 1 if (bp >= 140 or hr >= 105) else 0
    else:
        # Multi-risk young adult
        bp = int(np.random.normal(152, 14))
        chol = int(np.random.normal(275, 25))
        hr = int(np.random.normal(112, 14))
        disease = 1

    bp = max(85, min(190, bp))
    chol = max(110, min(380, chol))
    hr = max(45, min(150, hr))
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
df_augmented = pd.concat([df_base, df_young], ignore_index=True)

print(f"Augmented dataset shape: {df_augmented.shape}")
print(f"Young adult disease incidence: {df_young['HeartDisease'].value_counts().to_dict()}")

df_augmented.to_csv(data_path, index=False)
print(f"Successfully saved augmented dataset to: {data_path}")
