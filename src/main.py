# main.py (FastAPI backend)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class OnboardingData(BaseModel):
    name: str
    age: int
    income: float
    occupation: str
    education: str
    maritalStatus: str
    dependents: str
    location: str
    hobbies: str
    gamblingHistory: str

@app.post("/onboarding")
async def receive_onboarding(data: OnboardingData):
    print("Received onboarding data:", data.dict())
    return {"message": "Data received successfully"}

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
    betName: int
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

@app.get("/api/dashboard-data", response_model=DashboardData)
def get_dashboard_data():
    return {
        "userName": "John",
        "betName": 300,
        "projectedMonthlyIncome": 8500,
        "monthlyExpenses": 2300,
        "dependents": 2,
        "pros": ["High potential return", "Low initial risk", "Supports long-term goals"],
        "cons": ["Potential loss of savings", "Requires consistent tracking", "High volatility in early weeks"],
        "pieData": [
            {"id": 0, "value": 10, "label": "Savings"},
            {"id": 1, "value": 15, "label": "Expenses"},
            {"id": 2, "value": 20, "label": "Your Bet"}
        ],
        # Updated for 5 bars
        "barLabels": ["A", "B", "C", "D", "E"],
        "barLabelName": "Most Significant Features",
        "barYAxisName": "Risk",
        "barSeries": [
            {"data": [4, 3, 6, 2, 5]}
        ],
        "lineLabels": [1, 2, 3, 4],
        "lineXAxisName": "Weeks",
        "lineYAxisName": "Gamble ($)",
        "lineSeries": [
            {"data": [2, 4, 6, 10], "area": True},
            {"data": [0, 2, 4, 5], "area": True},
        ],
    }

@app.post("/bet_analysis")
async def receive_bet_analysis(data: OnboardingData):
    print("Received onboarding data:", data.dict())
    # we get the data from the user input
    # we put this data into statistical model
    # we take all of this data and also data pulled surrounding the user's onboarding and put it in the LLM
    # we take some of the values from all three sources in the json listed above to populate the dashboard

    return {"message": "Data received successfully"}
