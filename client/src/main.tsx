import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add SEO meta tags
document.title = "Todo Summary Assistant";
const metaDescription = document.createElement("meta");
metaDescription.name = "description";
metaDescription.content = "Manage your to-do tasks and get AI-generated summaries to improve productivity";
document.head.appendChild(metaDescription);

// Add Open Graph tags
const ogTitle = document.createElement("meta");
ogTitle.property = "og:title";
ogTitle.content = "Todo Summary Assistant";
document.head.appendChild(ogTitle);

const ogDescription = document.createElement("meta");
ogDescription.property = "og:description";
ogDescription.content = "Manage your to-do tasks and get AI-generated summaries to improve productivity";
document.head.appendChild(ogDescription);

createRoot(document.getElementById("root")!).render(<App />);
