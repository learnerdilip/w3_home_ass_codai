quotes: [
  {
    _id: "5d91b45d9980192a317c8acc",
    quoteText:
      "Notice that the stiffest tree is most easily cracked, while the bamboo or willow survives by bending with the wind.",
    quoteAuthor: "Bruce Lee",
    liking: 0
  },
  {
    _id: "5d91b45d9980192a317c8abe",
    quoteText:
      "Give me six hours to chop down a tree and I will spend the first four sharpening the axe.",
    quoteAuthor: "Abraham Lincoln",
    liking: 0
  },
  {
    _id: "5d91b45d9980192a317c8955",
    quoteText:
      "Good timber does not grow with ease; the stronger the wind, the stronger the trees.",
    quoteAuthor: "J. Willard Marriott",
    liking: 0
  }
];

likecount = (arr, likeid, id) => {
  const newArray = arr.map(item => {
    const changedelement = arr.find(element => element._id === id);
    if (changedelement._id === item._id) {
      return { ...item, liking: likeid };
    } else {
      return { ...item };
    }
  });
  return newArray;
}

const test = likecount(quotes,3,5d91b45d9980192a317c8abe)
console.log(test)