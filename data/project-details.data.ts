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
  // SWE project details retained for later use.
//   "star-wars-explorer": {
//     introduction:
//       "An exploration interface for browsing the people, places, and vehicles of Star Wars. The application brings information from SWAPI into a searchable experience with dedicated views for individual records.",
//     overview: [
//       "Star Wars Explorer organizes a large fictional universe into categories that visitors can explore at their own pace. Rather than reading raw API responses, users work with an interface that presents lists of records and lets them open the information they want to investigate. Characters, planets, and vehicles provide different starting points for discovering the universe.",
//       "The application combines React and TypeScript with Mantine UI to support a consistent experience across screen sizes. Routing connects the browsing and detail views, while authentication forms part of the application flow. Search, filtering, and pagination help users navigate the available data, and the theme switch lets them choose a light or dark appearance.",
//     ],
//     features: [
//       { title: "Category-based exploration", description: "Browse separate collections for characters, planets, vehicles, and other Star Wars records. Each category gives users a focused way to explore a particular part of the universe." },
//       { title: "Search, filtering, and pagination", description: "Narrow the available results and move through records in manageable pages. These controls make it easier to find a specific entry within a larger collection." },
//       { title: "Dedicated detail views", description: "Open a record to read more about it instead of fitting every piece of information into the list. Routing connects these detail views with the browsing experience." },
//       { title: "Responsive interface and themes", description: "Use the Mantine interface on different screen sizes and switch between light and dark themes to choose the appearance that suits the browsing session." },
//     ],
//     workflow: [
//       "Start with the authentication flow to access the explorer.",
//       "Choose a category, such as people, planets, or vehicles.",
//       "Search or filter the collection and use pagination to browse the results.",
//       "Open an entry to view its details, then return to the collection to continue exploring.",
//     ],
//     technologies: ["React", "TypeScript", "Mantine UI", "SWAPI"],
//   },
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
  // Quotes App temporarily disabled; uncomment to restore.
//   "minimal-quotes-app": {
//     introduction:
//       "A reading application for discovering quotes by topic. A minimal interface, dark mode, and progressive web app support help readers explore the collection in a way that fits their device and reading preferences.",
//     overview: [
//       "Minimal Quotes App provides a focused place to explore a collection of quotes. Categories such as love, happiness, and famous quotes give readers a starting point based on what they want to read. Organizing the collection by topic makes it easier to move toward a particular theme rather than browse every quote without direction.",
//       "The visual design emphasizes reading, with a minimal interface and a dark mode option for people who prefer a darker appearance. Progressive web app functionality extends the experience beyond a regular browser visit: readers can install the application on supported devices and access it from their app launcher. The same collection remains the focus across these different ways of opening the app.",
//     ],
//     features: [
//       { title: "A collection to explore", description: "Browse and read quotes in a dedicated application. The interface is designed around the reading experience rather than surrounding the text with unnecessary visual complexity." },
//       { title: "Topic-based categories", description: "Explore themes including love, happiness, and famous quotes. Categories help readers choose a part of the collection that matches their interests or mood." },
//       { title: "Dark mode", description: "Choose a darker appearance for the reading interface. This gives readers another display option when they prefer a darker screen, including in low-light settings." },
//       { title: "Progressive web app support", description: "Install the application on supported devices for convenient access from an app launcher, while retaining the option to read directly through the website." },
//     ],
//     workflow: [
//       "Open the application and browse the available quote categories.",
//       "Choose a topic that interests you and read through its quotes.",
//       "Use dark mode if you prefer a darker reading interface.",
//       "Install the web app on a supported device for easier access to future reading sessions.",
//     ],
//     technologies: ["Progressive Web App"],
//   },
  voya: {
    "introduction": "A conversational Sri Lanka travel planner combining document-backed AI generation, persistent conversations, and account-specific preferences. Voya AI turns trip requirements into structured itinerary drafts, supports follow-up revisions, and applies deterministic planning checks before presenting its replies.",
    "overview": [
      "Voya AI is a conversational travel-planning application focused on Sri Lanka. It brings itinerary drafting, trip revisions, budget organization and travel-reference retrieval into one interface. Users can create an account, start a conversation, describe a proposed trip and ask for changes to its duration, destinations, meals, transport or spending limit. The application stores conversations so users can return to earlier plans after signing in again.",
      "The frontend uses React and TypeScript to present chat messages, itinerary cards, planning assumptions, estimated budget categories and source titles. Travel preferences can be reviewed and edited through an account settings screen. The backend uses FastAPI to handle authentication, conversation ownership, persistence and the AI response pipeline.",
      "For each eligible request, a deterministic router chooses whether conversation history, private memory or shared travel documents are relevant. Pinecone supplies document passages through integrated text embedding and vector search. Local functions provide budget arithmetic and seasonal climate references. The prompt combines applicable evidence, trip context and preferences before requesting a structured reply from a Groq-hosted language model. This is retrieval-augmented generation; no custom model training or fine-tuning is implemented.",
      "Before returning a generated plan, the backend checks its structure and selected planning constraints. These checks cover stated budget caps, certain unsupported fee and transport claims, preserved trip details and locations from a small venue catalogue. A failed check can trigger a correction request or a safe fallback. The interface progressively reveals validated content rather than displaying unchecked live model tokens.",
      "The application includes PostgreSQL persistence, Redis-backed authentication controls, automated test suites and Docker Compose configuration for local execution. Its outputs remain provisional: budget figures are planning allowances, reference documents can become outdated, and the application does not verify live bookings, current entrance fees or transport availability."
    ],
    "features": [
      {
        "title": "Conversational itinerary planning",
        "description": "Converts natural-language trip requests into structured day-by-day plans. Users can revise duration, meals, transport and other requirements through follow-up messages. Conversation history and server-owned planning context help preserve the active trip, while recognized missing references or conflicting requirements trigger clarification."
      },
      {
        "title": "Document-backed travel retrieval",
        "description": "Retrieves relevant travel passages from Pinecone and incorporates them into the generation prompt. Filtering considers similarity, lexical relevance, named places and timetable direction. The interface presents friendly document titles so users can see which references were retrieved."
      },
      {
        "title": "Budget organization with explicit provenance",
        "description": "Applies user-stated total caps and calculates category allowances using deterministic arithmetic. The application distinguishes stated budgets, confirmed saved preferences and suggested estimates. Budget figures are presented as provisional allocations rather than verified prices or guaranteed trip costs."
      },
      {
        "title": "Account-specific preferences and context",
        "description": "Stores structured travel preferences on the account and supports separate semantic memory for eligible interactions. Users can edit their saved preferences in Settings or disable learning for a particular trip. Account-derived memory scopes separate private retrieval from shared travel documents."
      },
      {
        "title": "Persistent conversations and session continuity",
        "description": "Stores conversation exchanges in PostgreSQL and checks account ownership when accessing history. Recent conversations can be reopened, and the selected conversation can be restored after login or refresh. Frontend guards help prevent stale requests from updating another account's interface."
      },
      {
        "title": "Validated structured responses",
        "description": "Checks generated output before presentation, including response structure, budget caps and selected fee, transport and itinerary constraints. Failed checks can trigger a targeted correction request or fallback. Validated summaries, cards and budget sections are then revealed progressively in the chat interface."
      }
    ],
    "workflow": [
      "Create an account or sign in to the browser workspace.",
      "Review travel preferences in Settings or start a new conversation.",
      "Describe the destination, duration, party, budget and travel preferences. Respond to clarifications or review any disclosed planning assumptions.",
      "Review the provisional itinerary, assumptions, allocations and available source titles, then request revisions through follow-up messages.",
      "Reopen the saved conversation after login or refresh to continue planning."
    ],
    "aiWorkflow": {
      "steps": [
        {
          "title": "Resolve context",
          "description": "A deterministic router classifies the request and selects relevant history, trip state, saved preferences, and account-scoped memory. Recognized conflicts or missing references can produce an early clarification without model generation."
        },
        {
          "title": "Retrieve and prepare",
          "description": "Filter shared travel-document passages and retrieve eligible private memory from separate Pinecone namespaces. Local budget and seasonal-climate functions resolve supported lookups. Prompt construction combines this context with active instructions and the latest usable itinerary."
        },
        {
          "title": "Generate structured content",
          "description": "Request a structured response from the Groq-hosted openai/gpt-oss-120b model. The current chat path resolves local tools in application code, with model tool execution disabled. Unsupported factual requests can receive a fallback before generation."
        },
        {
          "title": "Validate, persist and deliver",
          "description": "Normalize the response and check selected planning constraints. A failed check can trigger a correction request or fallback. Successful exchanges are stored in PostgreSQL, eligible learning updates account context, and SSE delivers validated content for the frontend's progressive reveal."
        }
      ],
      "notes": [
        "A normal successful generated answer uses one model completion. Some clarifications use none; correction, recovery, and provider retries can add requests. No measured latency improvement is established.",
        "The backend buffers generated text until parsing and validation finish. Visible typing is a frontend reveal of validated content, rather than unchecked live model-token display."
      ]
    },
    "architecture": {
      "diagram": "/assets/portfolio/voya/architecture.svg",
      "alt": "Voya AI architecture: React and Nginx connect to FastAPI, PostgreSQL and Redis. Deterministic routing selects travel knowledge, account memory and local functions for prompt construction, Groq generation and validation. Fallbacks and valid replies flow through persistence and SSE to the frontend. A manual ingestion CLI extracts, chunks and embeds documents into shared knowledge.",
      "description": "Nginx serves the React application and proxies requests to FastAPI. Authentication and conversation ownership checks connect each request to the appropriate PostgreSQL records and Redis controls. Deterministic routing selects history, shared travel knowledge, private memory, and local functions before prompt construction, generation, and validation. A separate manual ingestion path prepares documents for the shared knowledge base.",
      "caption": "The diagram follows the supplied audit, including early clarification, unsupported-information fallbacks, correction requests, and eligible memory learning. Successful replies and clarifications can be persisted; generations carrying an error_code are delivered without completed-exchange persistence. Generated text is validated before SSE presentation."
    },
    "implementationNotes": [
      "Chat history and structured preferences live in PostgreSQL; account-scoped semantic memory lives in Pinecone. Clearing Settings preferences does not erase vector memory or conversation history.",
      "Knowledge ingestion is a manual backend CLI for PDF, TXT, and Markdown files. PDF extraction can use a fingerprint-matched reviewed sidecar or local OCR. Pinecone supplies integrated embeddings; there is no document-upload screen.",
      "Source titles show which filtered document passages were supplied as context. They are not claim-level citations or a guarantee that every generated sentence is verified.",
      "Budget categories are fixed-style planning allocations with exact sums. Seasonal climate and ingested documents are reference material; current prices, live schedules, booking availability, and affordability are not established by those calculations.",
      "The portfolio describes the implemented chat and Settings workflows. Dedicated My Trips and Saved screens, and the recent-chat View all action, remain placeholders.",
      "Docker Compose provides the local application environment. External Groq and Pinecone configuration is required; current public deployment and production performance are not established."
    ],
    "technologies": [
      "Python",
      "TypeScript",
      "React",
      "React Router",
      "Vite",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
      "Lucide React",
      "React Hook Form",
      "Zod",
      "FastAPI",
      "Uvicorn",
      "Pydantic",
      "SQLAlchemy",
      "psycopg2",
      "Alembic",
      "PostgreSQL",
      "Redis",
      "Pinecone",
      "Groq",
      "Document RAG",
      "SSE",
      "Argon2",
      "PyJWT",
      "pypdf",
      "Local OCR",
      "Docker Compose",
      "Nginx",
      "pytest",
      "Vitest",
      "React Testing Library"
    ]
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
