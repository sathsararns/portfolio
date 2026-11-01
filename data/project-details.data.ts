export type ProjectDetails = {
  introduction: string;
  overview: string[];
  features: { title: string; description: string }[];
  workflow: string[];
  technologies?: string[];
  modelEvaluation?: {
    description: string;
    metrics: { label: string; value: string }[];
    notes: string[];
  };
  implementationNotes?: string[];
  aiWorkflow?: {
    steps: { title: string; description: string }[];
    notes: string[];
  };
  architecture?: {
    diagram: string;
    description: string;
    caption: string;
    alt?: string;
  };
};

export const projectDetails = {
  "star-wars-explorer": {
    introduction:
      "An exploration interface for browsing the people, places, and vehicles of Star Wars. The application brings information from SWAPI into a searchable experience with dedicated views for individual records.",
    overview: [
      "Star Wars Explorer organizes a large fictional universe into categories that visitors can explore at their own pace. Rather than reading raw API responses, users work with an interface that presents lists of records and lets them open the information they want to investigate. Characters, planets, and vehicles provide different starting points for discovering the universe.",
      "The application combines React and TypeScript with Mantine UI to support a consistent experience across screen sizes. Routing connects the browsing and detail views, while authentication forms part of the application flow. Search, filtering, and pagination help users navigate the available data, and the theme switch lets them choose a light or dark appearance.",
    ],
    features: [
      { title: "Category-based exploration", description: "Browse separate collections for characters, planets, vehicles, and other Star Wars records. Each category gives users a focused way to explore a particular part of the universe." },
      { title: "Search, filtering, and pagination", description: "Narrow the available results and move through records in manageable pages. These controls make it easier to find a specific entry within a larger collection." },
      { title: "Dedicated detail views", description: "Open a record to read more about it instead of fitting every piece of information into the list. Routing connects these detail views with the browsing experience." },
      { title: "Responsive interface and themes", description: "Use the Mantine interface on different screen sizes and switch between light and dark themes to choose the appearance that suits the browsing session." },
    ],
    workflow: [
      "Start with the authentication flow to access the explorer.",
      "Choose a category, such as people, planets, or vehicles.",
      "Search or filter the collection and use pagination to browse the results.",
      "Open an entry to view its details, then return to the collection to continue exploring.",
    ],
    technologies: ["React", "TypeScript", "Mantine UI", "SWAPI"],
  },
  wedahub: {
    introduction:
      "A service booking application for customers, local providers, and administrators. WedaHub combines provider discovery and booking management with a task-specific LLM assistant that collects requirements, recommends providers, and creates booking requests after the customer's confirmation.",
    overview: [
      "WedaHub brings provider discovery and service booking into one web application for customers, service providers, and administrators. Customers can browse service categories, filter providers by name, location, and minimum rating, inspect profiles and work galleries, and submit booking requests with a service city, date, and work description. They can view booking statuses and submit provider reviews.",
      "Providers can edit their profiles and work galleries, inspect incoming requests, accept or reject pending bookings, and mark accepted work as completed. Administrative screens display user and booking counts, recent activity, user blocking controls, booking records, and contact messages.",
      "The AI assistant offers a conversational route through provider discovery and booking. A Python service extracts structured requirements from messages, retains booking state between turns, and coordinates search, recommendation, provider selection, missing-detail collection, confirmation, and booking creation. Language models support extraction, provider ranking, and bounded tool selection; application rules handle much of the workflow and format the final replies.",
      "An optional retrieval path embeds provider records and searches them by semantic similarity, with a keyword-search fallback when unavailable. React communicates with an Express API backed by MongoDB, while FastAPI connects the AI workflow to model inference and backend operations. Socket.IO connects booking changes to updates in the relevant screens.",
    ],
    features: [
      { title: "Provider discovery and profiles", description: "Browse service categories, filter fetched providers by name, city or district text, and minimum rating, and sort by rating, review count, or name. Profiles include contact information, descriptions, reviews, and work galleries." },
      { title: "Booking requests and provider actions", description: "Customers submit a provider, service, work description, city, and date. Requests begin as pending; providers can accept or reject them and mark accepted work completed. A request does not reserve a conflict-free calendar slot." },
      { title: "Conversational booking assistant", description: "Describe a service in chat, review provider recommendations, select a provider, supply missing booking details, and confirm the request. LangGraph coordinates structured extraction, application rules, and bounded model tool calls." },
      { title: "Booking updates and reviews", description: "Customers and providers can filter their booking lists by status. Socket.IO events trigger those lists to reload after booking changes. Accounts can submit one review per provider; the backend updates the average rating and review count." },
      { title: "Administrative records and controls", description: "Administrative screens present user and booking totals, recent activity, user lists, booking records, and contact submissions. User controls connect to block and unblock actions; booking and message screens primarily display records." },
      { title: "Images, locations, and account access", description: "JWT login and bcrypt hashing support account access. Configured Cloudinary uploads handle profile and gallery images, while Geoapify supplies Sri Lanka location suggestions. Leaflet and OpenStreetMap provide the contact map." },
    ],
    workflow: [
      "Browse a service category, filter or sort its providers, and inspect profiles, work galleries, and reviews.",
      "Register or log in to submit a booking request through the form, or use the assistant to collect the service, location, date, and work description before confirming a request.",
      "The selected provider reviews the pending request and accepts or rejects it. Accepted work can later be marked completed.",
      "Customers and providers follow booking status in their booking lists, which refresh in response to Socket.IO events. Customers can also submit provider reviews and contact messages.",
      "Administrators inspect application records and use the available account blocking controls through their dashboard.",
    ],
    aiWorkflow: {
      steps: [
        { title: "Extract and retain requirements", description: "A Groq-hosted model extracts service, location, date, and work description into a Pydantic schema. The application merges new values into the current conversation's booking state." },
        { title: "Find and recommend providers", description: "The graph coordinates search and model-assisted ranking. Optional FastEmbed embeddings and NumPy cosine similarity retrieve provider records; disabled or unavailable semantic retrieval uses the Express keyword-search route." },
        { title: "Select, complete, and confirm", description: "The application interprets the provider selection and collects missing details. After the customer confirms, the Python service calls Express to create a pending booking request. Tool-calling loops are bounded to four iterations." },
        { title: "Return the result and follow its status", description: "Application-formatted replies present the result. Status lookup refers to the booking retained in the current conversation. SSE chunks are sent after the workflow produces its reply, rather than streaming live model tokens." },
      ],
      notes: [
        "Semantic retrieval is over provider records, rather than uploaded documents. Location relevance is text-based; retrieval does not calculate geographic distance. An empty semantic result is treated as no match.",
        "Semantic retrieval is optional and is disabled in the supplied AI Render configuration. Conversation state and the embedding index are held in process memory.",
      ],
    },
    architecture: {
      diagram: "/assets/portfolio/wedahub/architecture.svg",
      description: "The React / Vite frontend sends application and chat requests to Express. Express persists application data in MongoDB through Mongoose and forwards chat, reset, and readiness operations to the FastAPI service. LangGraph coordinates the AI workflow, Groq provides model inference, and the Python service calls Express for provider search and booking operations.",
      caption: "The active AI workflow accesses provider records and bookings through Express, without a direct connection to MongoDB. The browser also connects to Cloudinary, Geoapify, and OpenStreetMap. Socket.IO events notify the frontend about application changes.",
    },
    technologies: ["JavaScript / JSX", "React", "React Router", "Vite", "Tailwind CSS", "Framer Motion", "Axios", "Socket.IO", "Node.js", "Express", "MongoDB", "Mongoose", "JWT", "bcrypt", "Python", "FastAPI", "Uvicorn", "LangGraph", "LangChain", "ChatGroq", "Pydantic", "Groq", "FastEmbed (optional)", "NumPy (optional retrieval)", "Cloudinary", "Geoapify", "Leaflet", "OpenStreetMap"],
  },
  skribbid: {
    introduction:
      "A multiplayer drawing and guessing game built around shared rooms. Skribbid gives friends a place to draw, interpret each other's sketches, and play together through a simple room-based flow.",
    overview: [
      "Skribbid combines drawing with the challenge of recognizing what another player is trying to communicate. The central interaction is easy to understand: a drawing becomes a clue, and the other players try to identify it. This creates a shared activity where visual communication and guessing are part of the same experience.",
      "Rooms give the game a clear starting point for a group of friends. Players can create a space for their game or join an existing room before taking part in the drawing and guessing experience. The project concentrates on that social loop, bringing the players into a common game session rather than treating drawing as a solitary activity.",
    ],
    features: [
      { title: "Create a game room", description: "Start a room to bring a group of players into the same game. Room creation provides the entry point for organizing a shared drawing and guessing session." },
      { title: "Join an existing room", description: "Players can join a room that has already been created, allowing friends to gather in the same session before beginning the game." },
      { title: "Drawing as a clue", description: "Use drawings to communicate an idea visually. The sketches are part of the game itself, giving the other players something to interpret and identify." },
      { title: "Multiplayer guessing", description: "Play with other people and try to recognize what is being drawn. The interaction between the drawing and the guesses is the core of the shared experience." },
    ],
    workflow: [
      "Open Skribbid and choose whether to create a room or join one.",
      "Gather your friends in the same game room.",
      "Take part in the drawing and guessing activity with the other players.",
      "Keep playing together by interpreting sketches and communicating ideas through drawings.",
    ],
  },
  "minimal-quotes-app": {
    introduction:
      "A reading application for discovering quotes by topic. A minimal interface, dark mode, and progressive web app support help readers explore the collection in a way that fits their device and reading preferences.",
    overview: [
      "Minimal Quotes App provides a focused place to explore a collection of quotes. Categories such as love, happiness, and famous quotes give readers a starting point based on what they want to read. Organizing the collection by topic makes it easier to move toward a particular theme rather than browse every quote without direction.",
      "The visual design emphasizes reading, with a minimal interface and a dark mode option for people who prefer a darker appearance. Progressive web app functionality extends the experience beyond a regular browser visit: readers can install the application on supported devices and access it from their app launcher. The same collection remains the focus across these different ways of opening the app.",
    ],
    features: [
      { title: "A collection to explore", description: "Browse and read quotes in a dedicated application. The interface is designed around the reading experience rather than surrounding the text with unnecessary visual complexity." },
      { title: "Topic-based categories", description: "Explore themes including love, happiness, and famous quotes. Categories help readers choose a part of the collection that matches their interests or mood." },
      { title: "Dark mode", description: "Choose a darker appearance for the reading interface. This gives readers another display option when they prefer a darker screen, including in low-light settings." },
      { title: "Progressive web app support", description: "Install the application on supported devices for convenient access from an app launcher, while retaining the option to read directly through the website." },
    ],
    workflow: [
      "Open the application and browse the available quote categories.",
      "Choose a topic that interests you and read through its quotes.",
      "Use dark mode if you prefer a darker reading interface.",
      "Install the web app on a supported device for easier access to future reading sessions.",
    ],
    technologies: ["Progressive Web App"],
  },
  flux: {
    introduction:
      "An interface design showcase built with Ant Design. Flux presents a modern visual experience that demonstrates how a component library can support a consistent application interface.",
    overview: [
      "Flux explores interface design through Ant Design rather than centering the project on one particular user task. It serves as a showcase for the visual language and functionality of the library, bringing its components together in a modern application interface. The emphasis is on how the interface looks and how its elements work together as a coherent design.",
      "Using an established component library gives the project a common foundation for its interface elements. Flux demonstrates that foundation through the design of its pages and the presentation of its controls. The live application and the screenshot collection provide two ways to explore the work: visitors can interact with the showcase or examine the individual views captured in the portfolio.",
    ],
    features: [
      { title: "Ant Design foundation", description: "The interface is built around Ant Design, using the library as the foundation for the project's visual language and application components." },
      { title: "Modern interface presentation", description: "Flux brings the components into a contemporary interface, focusing on the presentation of the application and how its different elements fit together visually." },
      { title: "A consistent design approach", description: "Using a shared component library supports continuity across the interface. The showcase lets visitors examine how a common visual foundation shapes the overall experience." },
      { title: "Interactive design showcase", description: "The deployed application provides a way to explore the design directly, while the screenshots offer an overview of the interface views included in the project." },
    ],
    workflow: [
      "Open the live Flux application to explore the interface.",
      "Browse its views and examine the presentation of the Ant Design components.",
      "Interact with the interface to see how its visual elements work together.",
      "Use the screenshot gallery below to review individual views of the design.",
    ],
    technologies: ["Ant Design"],
  },
  "business-card-maker": {
    introduction:
      "A web tool for creating personalized business cards from ready-made design components. The application takes users from choosing a visual starting point to downloading a card they can keep and use.",
    overview: [
      "Business Card Maker turns the process of designing a card into a focused workflow. Instead of starting with an empty design, users have a range of default components that provide a foundation for their card. They can use those starting points to create a design that reflects their personal or business identity.",
      "The application connects the design experience with a downloadable result. Users work on their card, review the appearance, and download it once they are satisfied with the design. This keeps the project focused on a tangible output: the goal is to leave the application with a personalized business card, rather than only a design that can be viewed inside the tool.",
    ],
    features: [
      { title: "Ready-made design components", description: "Choose from default design components as a starting point. These give users a foundation to work with rather than requiring every card to begin from scratch." },
      { title: "Personalized card designs", description: "Create a card that reflects your identity or brand. The design workflow supports moving from the available starting components toward a card that feels personal." },
      { title: "A focused creation workflow", description: "The application brings the design process into a dedicated tool, allowing users to concentrate on the appearance of their card and the result they want to create." },
      { title: "Download the finished card", description: "Once the design is ready, download the business card. This turns the work inside the application into an output the user can keep outside the tool." },
    ],
    workflow: [
      "Open the maker and explore the available design components.",
      "Choose a starting design and personalize the card for your identity or brand.",
      "Review the result and make any design adjustments you need.",
      "Download the finished card when you are satisfied with its appearance.",
    ],
  },
  "photo-effects": {
    introduction:
      "An image editing playground for experimenting with visual effects. Users can upload a photo, adjust effects such as blur and hue, inspect the changes immediately, and download the edited result.",
    overview: [
      "Photo Effects gives users a direct way to explore how visual adjustments change an image. The process starts with a photo chosen by the user, making the editing experience relevant to their own material. Effects such as blur and hue changes provide different ways to experiment with the appearance of the uploaded image.",
      "Immediate visual feedback is central to the workflow. Users can see the result of their adjustments as they experiment, which helps them decide whether to keep a particular effect or continue changing it. A download option completes the process, allowing the modified photo to leave the application as a saved result instead of remaining only an on-screen preview.",
    ],
    features: [
      { title: "Upload your own image", description: "Begin with a photo from your own collection. Using the uploaded image as the editing canvas makes it possible to experiment with effects on material you actually want to change." },
      { title: "Explore visual effects", description: "Apply adjustments including blur and hue changes to alter the appearance of the photo. The available effects provide different directions for exploring the image visually." },
      { title: "Immediate preview", description: "See how the photo changes as you adjust the effects. This feedback makes it easier to compare different looks during the editing process." },
      { title: "Download the edited result", description: "Save the modified image with the effects you have selected. The download option gives users a usable output after they finish experimenting." },
    ],
    workflow: [
      "Upload the photo you want to edit.",
      "Choose an effect, such as blur or a hue adjustment, and change its settings.",
      "Review the live preview and continue adjusting the appearance until you are satisfied.",
      "Download the modified image with your chosen effects applied.",
    ],
  },
  opsyntra: {
    "introduction":  "A local ML engineering application connecting customer churn modeling with prediction APIs and streaming analytics. Opsyntra demonstrates how validated data becomes a saved prediction pipeline, an interactive web workspace, and a recoverable Kafka-to-PostgreSQL monitoring flow.",
    "overview":  [
                     "Opsyntra connects customer churn modeling with the application and data-processing components needed to demonstrate how a model is trained, served, monitored, and recovered after interruptions. It uses a supplied Telco customer dataset containing 7,043 records and separates customer identifiers and target labels from the 19 model inputs.",
                     "The training workflow validates the data, preserves missing TotalCharges values for training-only imputation, and persists stratified train, validation, and test memberships. Scikit-learn pipelines combine input normalization, imputation, categorical encoding, appropriate scaling, and classification. Dummy, Logistic Regression, Random Forest, and XGBoost candidates are compared using training-only cross-validation and validation average precision. Validation F1 determines the operating threshold, while the selected model receives a separate held-out test assessment. An alternative PySpark implementation enables comparison using the same customer partitions.",
                     "The web workspace provides individual customer prediction, CSV batch processing, downloadable results, dataset summaries, and model-performance views. Next.js forwards prediction requests through a server proxy to FastAPI, which caches the complete saved scikit-learn pipeline. The interface displays the saved-threshold decision alongside its estimated churn probability and model version. Direct predictions return to the browser, with recent history stored locally; this route does not automatically publish Kafka events.",
                     "A separate Kafka workflow samples or batches customer records, runs saved-model inference, and publishes traceable prediction events. A dedicated analytics consumer stores raw events, predictions, delivery provenance, and rejected messages in PostgreSQL. Stable identifiers, database constraints, and a persistent SQLite inference ledger support replay handling under documented at-least-once delivery.",
                     "Live monitoring presents event activity, predicted churn share, risk segments, recent predictions, and consumer health through configurable polling. MLflow records experiments, Airflow defines optional ML and Kafka workflows, and notebooks provide training-data exploration and saved-result analysis. Docker Compose packages the local demonstration. Streaming replays historical profiles, so its charts describe model outputs and processing activity rather than observed company churn trends."
                 ],
    "features":  [
                     {
                         "title":  "Individual churn prediction",
                         "description":  "Submit a customer profile or load an example to receive an estimated churn probability, the saved-threshold Yes/No classification, and the model version. FastAPI uses the complete cached scikit-learn pipeline so inference retains the learned preprocessing."
                     },
                     {
                         "title":  "CSV batch analysis",
                         "description":  "Process compatible CSV files containing the 19 expected predictor columns, search and filter the results, browse result pages, and download predictions as CSV. The API accepts up to 10,000 rows within its approximate 2 MB CSV-text limit."
                     },
                     {
                         "title":  "Leakage-aware model comparison",
                         "description":  "Compare Dummy, Logistic Regression, Random Forest, and XGBoost using training-only preprocessing and cross-validation. Validation average precision selects the candidate, validation F1 selects its threshold, and held-out data assesses the selected model. Alternative PySpark pipelines reuse the same saved customer partitions."
                     },
                     {
                         "title":  "Traceable Kafka inference",
                         "description":  "Publish customer events in batches or a simulated stream and produce predictions with stable event identities, timestamps, engine names, and model versions. A persistent SQLite outbox records delivery state before input offsets are committed; invalid customer messages go to a dead-letter topic."
                     },
                     {
                         "title":  "Persistent streaming analytics",
                         "description":  "A separate consumer stores logical events, predictions, delivery provenance, and rejected messages in PostgreSQL without rerunning inference. Database transactions precede Kafka offset commits, while stable identities and constraints support deduplication, out-of-order joins, and replay handling."
                     },
                     {
                         "title":  "Operational visibility and orchestration",
                         "description":  "Explore PostgreSQL-backed activity, predicted-risk segments, event traceability, and consumer health in a polling-based dashboard. MLflow tracks experiments and artifacts; optional Airflow workflows coordinate ML and Kafka tasks, with Docker Compose packaging the local services and persistent state."
                     }
                 ],
    "workflow":  [
                     "Prepare data: validate the Telco CSV, normalize values, retain blank TotalCharges for training-only imputation, and persist seeded, stratified customer memberships for the training, validation, and test partitions.",
                     "Train and select: tune complete pipelines using training-only cross-validation, rank candidates by validation average precision, select the operating threshold using validation F1, and assess the chosen model on held-out test data.",
                     "Persist evidence: save complete pipelines, metadata, evaluation reports, plots, and MLflow experiment records. Alternative Spark pipelines use the same saved memberships for engine comparison.",
                     "Generate predictions: submit customer or CSV requests through Next.js and FastAPI, or publish customer records through the separate Kafka workflow. The inference consumer loads its selected model and tracks output delivery in the persistent SQLite ledger.",
                     "Review analytics: the analytics consumer commits PostgreSQL records before Kafka offsets. Open Live monitoring to inspect filtered activity, predicted-risk segments, event and model identifiers, and processing health."
                 ],
    "modelEvaluation":  {
                            "description":  "Retained native scikit-learn results for the selected Random Forest, model version d9a13b4cf6839ed4. These values describe its 1,409-customer held-out test partition; they are saved experiment results rather than a fresh evaluation or live dashboard measurements.",
                            "metrics":  [
                                            {
                                                "label":  "Churn recall",
                                                "value":  "79.68%"
                                            },
                                            {
                                                "label":  "Churn precision",
                                                "value":  "50.85%"
                                            },
                                            {
                                                "label":  "ROC-AUC",
                                                "value":  "0.843857"
                                            },
                                            {
                                                "label":  "Average precision",
                                                "value":  "0.658023"
                                            },
                                            {
                                                "label":  "F1 score",
                                                "value":  "0.620833"
                                            },
                                            {
                                                "label":  "Decision threshold",
                                                "value":  "0.276342"
                                            }
                                        ],
                            "notes":  [
                                          "The saved split contains 4,225 training, 1,409 validation, and 1,409 test customers. The threshold maximizes validation F1; test results assess the selected pipeline.",
                                          "The model identified 298 of 374 test churners, with 288 false positives. Its probabilities are model estimates; calibration and business-cost optimization are not established.",
                                          "Docker captures can use a separately versioned model. These native-artifact metrics should not be attributed to every screenshot or container run."
                                      ]
                        },
    "architecture":  {
                         "diagram":  "/assets/portfolio/opsyntra/architecture.svg",
                         "alt":  "Opsyntra architecture showing Telco data preparation, scikit-learn and optional Spark training, saved models, MLflow and Airflow, Next.js and FastAPI predictions, and the separate Kafka, SQLite and PostgreSQL analytics flow.",
                         "description":  "Validated Telco data feeds saved-model training and a separate event producer. Next.js customer and CSV screens call FastAPI through a server proxy. Kafka inference publishes predictions and retains delivery state in SQLite; a separate analytics consumer commits PostgreSQL transactions before Kafka offsets. Read-only analytics endpoints serve the Live monitoring screen.",
                         "caption":  "Solid arrows show application and data flows; dashed arrows mark optional integrations and experiment tracking. Direct HTTP predictions and Kafka analytics remain separate. The stream uses historical-data replay, and output delivery is at-least-once with logical deduplication."
                     },
    "implementationNotes":  [
                                "Live monitoring refreshes through configurable HTTP polling, with a default five-second delay after each completed refresh. Predicted churn share describes model outputs, rather than observed churn or live model accuracy.",
                                "Recovery retains a persistent local SQLite ledger for one inference replica. A crash window can produce duplicate physical Kafka deliveries; stable identities and PostgreSQL constraints preserve logical event counts.",
                                "Spark is an alternative training and inference engine. The direct prediction API uses scikit-learn, and selecting Spark in dashboard filters does not start a Spark consumer.",
                                "The application is demonstrated locally with Docker Compose. Spark, the MLflow UI, and Airflow are optional services; public cloud deployment and production use are not established."
                            ],
    "technologies":  [
                         "Python",
                         "TypeScript",
                         "SQL",
                         "Next.js",
                         "React",
                         "Tailwind CSS",
                         "FastAPI",
                         "Pydantic",
                         "Uvicorn",
                         "pandas",
                         "NumPy",
                         "scikit-learn",
                         "XGBoost",
                         "Joblib",
                         "PySpark (alternative)",
                         "Apache Kafka",
                         "confluent-kafka",
                         "PostgreSQL",
                         "SQLite",
                         "MLflow",
                         "Apache Airflow (optional)",
                         "Docker Compose",
                         "Matplotlib",
                         "Jupyter",
                         "Python unittest",
                         "Playwright",
                         "GitHub Actions configuration"
                     ]
},
} satisfies Record<string, ProjectDetails>;
