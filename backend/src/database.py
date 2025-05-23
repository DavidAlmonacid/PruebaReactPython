"""
Connects to a SQL database using pyodbc
"""

import os

import pyodbc
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


def get_db_connection() -> pyodbc.Connection | None:
    try:
        SERVER = os.getenv("DB_SERVER")
        PORT = os.getenv("DB_PORT", "1433")
        DATABASE = os.getenv("DB_NAME")
        USERNAME = os.getenv("DB_USER")
        PASSWORD = os.getenv("DB_PASSWORD")

        connectionString = (
            f"DRIVER={{ODBC Driver 18 for SQL Server}};"
            f"SERVER={SERVER},{PORT};"
            f"DATABASE={DATABASE};"
            f"UID={USERNAME};"
            f"PWD={PASSWORD};"
            f"TrustServerCertificate=yes;"
            f"Connection Timeout=30;"
        )

        conn = pyodbc.connect(connectionString)

        return conn
    except pyodbc.Error as e:
        print("Error connecting to database:", e)
        return None
    except Exception as e:
        print("An unexpected error occurred:", e)
        return None


# Test the connection
if __name__ == "__main__":
    conn = get_db_connection()
    if conn:
        print("Connection successful")
        conn.close()
    else:
        print("Connection failed")
