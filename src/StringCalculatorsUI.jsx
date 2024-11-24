import React, { useState } from "react";

const StringCalculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const parseInput = () => {
    try {
      const numbers = input
        .split(/,|\n/)
        .map((num) => parseFloat(num.trim()))
        .filter((num) => !isNaN(num));
      if (numbers.length === 0) throw new Error("No valid numbers provided.");
      return numbers;
    } catch {
      throw new Error("Invalid input. Please enter numbers separated by commas or newlines.");
    }
  };

  const calculate = (operation) => {
    setError("");
    try {
      const numbers = parseInput();

      let result;
      switch (operation) {
        case "sum":
          result = numbers.reduce((acc, curr) => acc + curr, 0);
          break;
        case "multiply":
          result = numbers.reduce((acc, curr) => acc * curr, 1);
          break;
        case "divide":
          result = numbers.reduce((acc, curr) => acc / curr);
          break;
        default:
          throw new Error("Unsupported operation.");
      }
      setResult(result);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>String Calculator</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter numbers separated by ','"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <button
          onClick={() => calculate("sum")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            margin: "5px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sum
        </button>
        <button
          onClick={() => calculate("multiply")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            margin: "5px",
            backgroundColor: "#ffc107",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Multiply
        </button>
        <button
          onClick={() => calculate("divide")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            margin: "5px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Divide
        </button>
      </div>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {result !== null && (
        <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
          Result: {result}
        </div>
      )}
    </div>
  );
};

export default StringCalculator;