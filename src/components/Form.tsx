import React, { useEffect, useRef, useState } from "react";

type Props = {
  formSubmit: (rating: string, comments: string) => void;
};

const selectOptions = [
  "Randomize",
  "Excellent",
  "Very Good",
  "Good",
  "Average",
  "Poor",
];

const Form: React.FC<Props> = props => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ratingSelectRef = useRef<HTMLSelectElement>(null);

  const [previousRating, setPreviousRating] = useState<string>();

  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rating: string = ratingSelectRef.current!.value;
    let comments: string = textareaRef.current!.value.trim();

    if (comments === "") {
      if (rating === "Randomize") comments = "Good";
      else comments = rating;
    }

    localStorage.setItem("rating", rating);

    props.formSubmit(rating, comments);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem("rating", e.currentTarget.value);
  };

  useEffect(() => {
    if (localStorage.getItem("rating"))
      setPreviousRating(localStorage.getItem("rating") as string);
  }, []);

  return (
    <form className="flex flex-col my-10" onSubmit={handleFormSubmission}>
      {/* RATING SELECTOR */}
      <div className="rating-section">
        <label
          htmlFor="rating"
          className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          General Rating
        </label>
        <select
          ref={ratingSelectRef}
          id="rating"
          onChange={handleOptionChange}
          className="outline-none block p-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {selectOptions.slice(0, 1).map(option => (
            <option
              key={option}
              value={option}
              selected={previousRating === option}
            >
              {option}
            </option>
          ))}
          <option disabled>──────────</option>
          {selectOptions.slice(1).map(option => (
            <option
              key={option}
              value={option}
              selected={previousRating === option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      <br className="my-3" />

      {/* COMMENTS SECTION */}
      <div className="comments-section">
        <label
          htmlFor="message"
          className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Comments
        </label>
        <textarea
          ref={textareaRef}
          id="message"
          rows={4}
          className="block p-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Leave a comment..."
        ></textarea>
      </div>

      <br className="my-3" />

      <button
        type="submit"
        className="self-end bg-blue-500 p-1.5 rounded-lg text-gray-50 px-3 text-sm hover:bg-blue-600"
      >
        Fill form
      </button>
    </form>
  );
};

export default Form;
