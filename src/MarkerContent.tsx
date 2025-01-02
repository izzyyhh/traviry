import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { XIcon } from "lucide-react";

const MarkerContent = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onClose,
}: {
  title: string;
  description: string;
  onTitleChange: (newTitle: string) => void;
  onDescriptionChange: (newDescription: string) => void;
  onClose: () => void;
}) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onDescriptionChange(e.target.value);
  };
  // TODO: think a bout a cool way of adding and displaying photos here
  // also i want to add notes, like little entries to phots or wherever
  // and normal diary text
  // location is super important should be shown here, where can i fetch it?
  return (
    <Card className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%] h-[80%]">
      <div className="relative">
        <CardHeader>
          <CardTitle>
            <input
              className="text-2xl font-bold"
              type="text"
              placeholder="Add a title"
              value={title}
              onChange={handleTitleChange}
            />
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <textarea
              placeholder="Add a description"
              value={description}
              onChange={handleDescriptionChange}
            />
            <button onClick={onClose} className="absolute top-0 right-0 p-4">
              <XIcon />
            </button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MarkerContent;
