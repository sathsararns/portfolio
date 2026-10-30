export type ProjectDetails = {
  introduction: string;
  overview: string[];
  features: { title: string; description: string }[];
  workflow: string[];
  technologies?: string[];
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
  chatto: {
    introduction:
      "A Next.js chat application designed for conversations across phones, tablets, and desktops. Its mobile-friendly interface and progressive web app support make it accessible through both the browser and an installed app experience.",
    overview: [
      "Chatto focuses on making a chatting interface comfortable to use across different devices. The project brings the conversation experience into a modern web application, with a layout designed to work on a phone as well as on a larger display. This makes the interface useful for users who switch between devices during their day.",
      "Built with Next.js, the application also includes progressive web app functionality. Users can install it on supported devices and open it from their app launcher rather than returning to a browser tab each time. The emphasis is on a consistent interface and convenient access to the chatting experience; installation is an additional way to use the same web application.",
    ],
    features: [
      { title: "Conversation-focused interface", description: "The application presents a dedicated space for chatting, using a modern interface that keeps the conversation experience at the center of the product." },
      { title: "Mobile-friendly layout", description: "The interface adapts to smaller displays so users can interact with the application on their phone, as well as on a tablet or desktop." },
      { title: "Installable web app", description: "Progressive web app support allows installation on supported devices. Users can launch Chatto from their device without opening the site manually each time." },
      { title: "Browser-based access", description: "Users can also access the application directly through its website. The installed experience complements the browser version and gives users another convenient entry point." },
    ],
    workflow: [
      "Open Chatto in a browser on a phone, tablet, or desktop.",
      "Use the chatting interface to take part in conversations.",
      "Install the progressive web app if your browser and device support it.",
      "Return through the website or the installed app when you want to use Chatto again.",
    ],
    technologies: ["Next.js", "Progressive Web App"],
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
  vidon: {
    introduction:
      "A video conferencing application built with the Jitsi library. Vidon brings hosting, scheduling, and rejoining meetings into one experience for remote conversations and group collaboration.",
    overview: [
      "Vidon focuses on bringing people together through video meetings. Its conferencing experience is powered by Jitsi, providing the foundation for hosting video conversations inside the application. The project supports the meeting lifecycle beyond the initial call, including planning a meeting and returning to a session that is already in progress.",
      "Scheduling gives users a way to prepare for a meeting in advance, while the option to rejoin supports continuing an ongoing conversation. Together, these capabilities make the application relevant to different kinds of gatherings, from team discussions to virtual events or personal catch-ups. The emphasis is on organizing and taking part in a video meeting through a dedicated application.",
    ],
    features: [
      { title: "Jitsi-powered conferencing", description: "Use a video meeting experience built on the Jitsi library. This integration provides the conferencing foundation for conversations within Vidon." },
      { title: "Host video meetings", description: "Start a meeting for a group conversation. Hosting is part of the application flow, giving users a place to bring other participants together." },
      { title: "Schedule in advance", description: "Plan a meeting before it takes place. Scheduling supports preparing a future session instead of limiting the application to meetings that start immediately." },
      { title: "Rejoin ongoing sessions", description: "Return to a meeting that is already in progress. This provides a way to continue participating in an existing conversation through the application." },
    ],
    workflow: [
      "Choose whether to host a meeting now or schedule one for later.",
      "Open the meeting when it is time to begin the conversation.",
      "Take part in the Jitsi-powered video session with the other participants.",
      "Use the option to rejoin when you need to return to an ongoing meeting.",
    ],
    technologies: ["Jitsi"],
  },
} satisfies Record<string, ProjectDetails>;
