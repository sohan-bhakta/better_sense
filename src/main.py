from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pickle
import pandas as pd
import joblib
app = FastAPI()

# 1) Load the model globally
with open("gambling_allocation_model.pkl", "rb") as f:
    model = joblib.load(f)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# Onboarding Models
# -----------------------
class OnboardingData(BaseModel):
    name: str
    age: int
    income: float
    monthlySpending: float
    savings: float
    debt: float
    assets: float
    networth: float
    mortgage: float
    dependents: int
    gamblingFrequency: str
    gamblingHistory: str

# We'll store the most recent onboarding data in memory.
app.state.onboarded_data: Optional[OnboardingData] = None

@app.post("/onboarding")
async def receive_onboarding(data: OnboardingData):
    print("Received onboarding data:", data.dict())
    app.state.onboarded_data = data
    return {"message": "Data received successfully"}

# -----------------------
# Dashboard Models
# -----------------------
class PieData(BaseModel):
    id: int
    value: float
    label: str

class BarSeriesData(BaseModel):
    data: List[float]

class LineSeriesData(BaseModel):
    data: List[float]
    area: bool

class DashboardData(BaseModel):
    userName: str
    projectedMonthlyIncome: float
    monthlyExpenses: float
    dependents: int
    pros: List[str]
    cons: List[str]
    pieData: List[PieData]
    barLabels: List[str]
    barLabelName: str
    barYAxisName: str
    barSeries: List[BarSeriesData]
    lineLabels: List[float]
    lineXAxisName: str
    lineYAxisName: str
    lineSeries: List[LineSeriesData]

# -----------------------
# Dashboard Endpoint
# -----------------------
@app.get("/api/dashboard-data", response_model=DashboardData)
def get_dashboard_data():
    user_data = app.state.onboarded_data

    # If no user data, return defaults
    if not user_data:
        return {
            "userName": "Guest",
            "projectedMonthlyIncome": 8500,
            "monthlyExpenses": 2300,
            "dependents": 0,
            "pros": ["High potential return", "Gambles: Unknown", "Supports long-term goals"],
            "cons": ["Potential loss of savings", "Requires consistent tracking", "No History Provided"],
            "pieData": [
                {"id": 0, "value": 100, "label": "Savings"},
                {"id": 1, "value": 2300, "label": "Spending"},
                {"id": 2, "value": 6100, "label": "Leftover"},
            ],
            "barLabels": ["Debt", "Networth", "Age"],
            "barLabelName": "Most Significant Features",
            "barYAxisName": "Risk",
            "barSeries": [{"data": [4, 3, 6]}],
            "lineLabels": [1, 2, 3, 4],
            "lineXAxisName": "Weeks",
            "lineYAxisName": "Gamble ($)",
            "lineSeries": [
                {"data": [2, 4, 6, 10], "area": True},
                {"data": [0, 2, 4, 5], "area": True},
            ],
        }
# Otherwise, we have user_data. Let's map it to the model's expected keys
    # According to your snippet, the model expects:
    # ['AGE', 'ASSET', 'SAVING', 'DEBT', 'MORTPAY', 'INCOME', 'NETWORTH']
    new_user = {
        "AGE": user_data.age,
        "ASSET": user_data.assets,
        "SAVING": user_data.savings * 12,
        "DEBT": user_data.debt,
        "MORTPAY": user_data.mortgage,
        "INCOME": user_data.income * 12,
        "NETWORTH": user_data.networth,
    }

    # Convert to a DataFrame
    df = pd.DataFrame([new_user])

    print(type(model))
    prediction = model.predict(df)  # e.g. might return a list or array

    print(prediction)
# We'll assume it's a single float or numeric for recommended gambling budget
    recommended_budget = round(float(prediction[0]), 2)

    # Example derived fields
    leftover = user_data.income - user_data.monthlySpending

    return {
        "userName": user_data.name,
        "projectedMonthlyIncome": user_data.income,
        "monthlyExpenses": user_data.monthlySpending,
        "dependents": user_data.dependents,
        "pros": [
            "High potential return",
            f"Gambles: {user_data.gamblingFrequency}",
            "Supports long-term goals"
        ],
        "cons": [
            "Potential loss of savings",
            "Requires consistent tracking",
            user_data.gamblingHistory,
        ],
        "pieData": [
            {"id": 0, "value": user_data.savings, "label": "Savings"},
            {"id": 1, "value": user_data.monthlySpending, "label": "Spending"},
            {
                "id": 2,
                "value": leftover - user_data.savings if leftover > user_data.savings else 0,
                "label": "Leftover",
            },
        ],
        "barLabels": ["Debt", "Networth", "Age"],
        "barLabelName": "Most Significant Features",
        "barYAxisName": "Risk",
        "barSeries": [{"data": [4, 3, 6]}],
        "lineLabels": [1, 2, 3, 4],
        "lineXAxisName": "Weeks",
        "lineYAxisName": "Gamble ($)",
        "lineSeries": [
            {"data": [2, 4, 6, 10], "area": True},
            {"data": [0, 2, 4, 5], "area": True},
        ],    }