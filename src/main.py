from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
#  Onboarding Models
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
# In production, you'd store it in a database.
app.state.onboarded_data: Optional[OnboardingData] = None

@app.post("/onboarding")
async def receive_onboarding(data: OnboardingData):
    print("Received onboarding data:", data.dict())
    # Save in memory for later use
    app.state.onboarded_data = data
    return {"message": "Data received successfully"}

# -----------------------
#   Dashboard Models
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
#   Dashboard Endpoint
# -----------------------
@app.get("/api/dashboard-data", response_model=DashboardData)
def get_dashboard_data():
    """
    1) Attempt to read user data from memory (if they've onboarded).
    2) Fill in the JSON with either user-provided values or fallback defaults.
    3) Return a complete DashboardData object.
    """

    user_data = app.state.onboarded_data

    # If the user hasn't onboarded yet, or certain fields are empty, default them.
    # We'll do a quick helper to safely pick a value or default.
    def pick(field, default):
        if user_data is not None:
            val = getattr(user_data, field, None)
            if val is not None:
                return val
        return default

    # Example of derived field: leftover = income - monthlySpending
    leftover = 0
    if user_data:
        leftover = user_data.income - user_data.monthlySpending

    # You can incorporate more logic to handle networth, mortgage, etc.
    # For now, let's show how you'd pick them (or a default).
    user_name = pick("name", "Guest")
    proj_monthly_income = pick("income", 8500)
    monthly_expenses = pick("monthlySpending", 2300)
    user_dependents = pick("dependents", 0)
    user_savings = pick("savings", 100)       # Hard-coded fallback
    user_debt = pick("debt", 5000)
    user_gamb_freq = pick("gamblingFrequency", "Unknown Frequency")
    user_gamb_hist = pick("gamblingHistory", "No History Provided")

    # Build the final response
    dashboard = {
        "userName": user_name,
        "projectedMonthlyIncome": proj_monthly_income,
        "monthlyExpenses": monthly_expenses,
        "dependents": user_dependents,
        "pros": [
            "High potential return",
            f"Gambles: {user_gamb_freq}",
            "Supports long-term goals"
        ],
        "cons": [
            "Potential loss of savings",
            "Requires consistent tracking",
            user_gamb_hist,
        ],
        "pieData": [
            {"id": 0, "value": user_savings, "label": "Savings"},
            {"id": 1, "value": user_debt,    "label": "Debt"},
            {"id": 2, "value": leftover,     "label": "Leftover"},
        ],
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
            {"data": [0, 2, 4, 5],  "area": True},
        ],
    }

    return dashboard
