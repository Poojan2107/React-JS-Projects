import React from "react";
import Card from "../../counter/src/components/Card";
import "./App.css";

const App = () => {
  const image = "/images/The Batman 1.jpeg";
  const title = "Bat-Man";
  const description =
    "A symbol of justice forged in the shadows, Batman is not just a man—he is a myth...";

  const image2 = "/images/Batman 2.jpeg";
  const title2 = "Bat-Man";
  const description2 =
    "Cloaked in darkness, driven by a past scarred with tragedy, he stands as Gotham’s last line of defense...";

  return (
    <div className="app">
      <Card image={image} title={title} description={description} />
      <Card image={image2} title={title2} description={description2} />
      <Card image={image} title={title} description={description} />
      <Card image={image2} title={title2} description={description2} />
    </div>
  );
};

export default App;
