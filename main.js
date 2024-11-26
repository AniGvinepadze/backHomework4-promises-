// 1) Create a Promise with a 50/50 Chance of Resolving or Rejecting

const randomChance = new Promise((resolve, reject) => {
  const randomMath = Math.random();

  if (randomMath < 0.5) {
    resolve("promise resolved");
  } else {
    reject("promise rejected");
  }
});

randomChance
  .then((message) => console.log(message))
  .catch((err) => console.error(err));

// 2) Fetch Data from Two Sources and Return the Faster Response: https://dummyjson.com/users and https://jsonplaceholder.typicode.com/users .
// Use either fetch or axios.

const url1 = "https://dummyjson.com/users ";
const url2 = "https://jsonplaceholder.typicode.com/users";

const fetchData = async () => {
  try {
    const fetchFasterDate = await Promise.race([
      fetch(url1).then((res) => res.json()),
      fetch(url2).then((res) => res.json()),
    ]);
    console.log(fetchFasterDate);
  } catch (error) {
    console.error("Network respons wanst ok", error);
  }
};
fetchData();

// 3) Write three promises that return arrays after different time intervals:
// Two should resolve successfully.
// One should reject.
// Merge the arrays from only the fulfilled promi

const promise1 = new Promise((resolve) => {
  setTimeout(() => resolve([1, 2, 3]), 1000);
});
const promise2 = new Promise((resolve) => {
  setTimeout(() => resolve([4, 5, 6]), 2000);
});
const promise3 = new Promise((rejected) => {
  setTimeout(() => rejected("promise rejected"), 1500);
});

const promises = async () => {
  try {
    const result = await Promise.allSettled([promise1, promise2, promise3]);

    const mergedArray = result
      .filter((result) => result.status === "fulfilled")
      .flatMap((result) => result.value);
    console.log("mergedArray", mergedArray);
  } catch (err) {
    console.error("error", err);
  }
};

promises();

// 4) Use these APIs: https://fakestoreapi.com/users  and https://jsonplaceholder.typicode.com/users Fetch data from both endpoints and display the combined data only if both promises are fulfilled successfully.




const url3 = "https://dummyjson.com/users ";
const url4 = "https://jsonplaceholder.typicode.com/users";


const fetchData2 = async()=>{
    try {
        const [data1,data2] = await Promise.all([
            fetch(url3).then((res)=>res.json()),
            fetch(url4).then((res)=>res.json())

        ])

        const data = [...data1.users,...data2]
        console.log("combined Data",data)
    } catch (error) {
        console.error('Network respons wanst ok', error);
    }
}
fetchData2()