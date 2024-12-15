import { useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function LoadingButton({ asyncFunction, args = [], initialText = "Click to load" }) {
//   const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState(initialText);
  const [buttonVariant, setButtonVariant] = useState("primary");

  function handleClick () {
    // setIsLoading(true);
    setButtonText("Adding ...");
    setButtonVariant("primary");
    setButtonDisabled(true);

    asyncFunction(...args)
      .then(() => {
        setButtonText("Success");
        setButtonVariant("success");
        setButtonDisabled(true);
      })
      .catch((error) => {
        setButtonText("Error. Try again?");
        setButtonVariant("danger");
        setButtonDisabled(false);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  return (
    <Button
      variant={buttonVariant}
      disabled={buttonDisabled}
      onClick={handleClick}
      size="lg"
    //   onClick={!isLoading ? handleClick : null}
    >
      {buttonText}
    </Button>
  );
}