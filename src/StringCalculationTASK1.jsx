import React, { useEffect } from "react";

const StringCalculation = () => {
  useEffect(() => {
    function add(numbers) {
      if (numbers.trim() === "") {
        return 0;
      }

      let delimiter = /[\n,]/;
      let numbersToProcess = numbers;

      if (numbers.startsWith("//")) {
        const delimiterLineEnd = numbers.indexOf("\n");
        delimiter = new RegExp(numbers.substring(2, delimiterLineEnd));
        numbersToProcess = numbers.substring(delimiterLineEnd + 1);
      }

      const numArray = numbersToProcess
        .split(delimiter)
        .map((num) => parseInt(num.trim(), 10));

      const negatives = numArray.filter((num) => num < 0);
      if (negatives.length > 0) {
        throw new Error(
          `Negative numbers not allowed: ${negatives.join(", ")}`
        );
      }

      return numArray.reduce((sum, num) => sum + num, 0);
    }

    // Examples
    try {
      console.log(add("")); // Output: 0
      console.log(add("1")); // Output: 1
      console.log(add("1,2")); // Output: 3
      console.log(add("1\n2,3")); // Output: 6
      console.log(add("//;\n1;2")); // Output: 3
      console.log(add("//#\n4#5#6")); // Output: 15
      console.log(add("//***\n7***8")); // Output: 15
      console.log(add("1,-2,3")); // Throws Error: Negative numbers not allowed: -2
    } catch (e) {
      console.error(e.message);
    }

    try {
      console.log(add("//;\n1;-2;-3")); // Throws Error: Negative numbers not allowed: -2, -3
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  return <div></div>;
};

export default StringCalculation;