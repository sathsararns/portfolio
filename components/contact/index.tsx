import { ContactComponent } from "./components/contact.component";

export default function Contact() {
  const date = new Date();

  return (
    <div className="mt-[200px]" id="contactme">
      <div>
        <ContactComponent />
      </div>
      <div className="h-[25vh] flex justify-center items-end">
        <p className="text-sm whitespace-nowrap mt-2 text-neutral-300 p-4">
          Copyright © {date.getFullYear()} Sathsara Ranasooriya. All rights reserved.
        </p>
      </div>
    </div>
  );
}
