import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function LoadingButton() {
  const [isLoading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState (false)
  const [buttonText, setButtonText] = useState ("Add to Google Calendar")
  const [buttonVarient, setButtonVarient] = useState ("primary")

  function simulateNetworkRequest() {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
  }

  useEffect(() => {
    if (isLoading) {
        setButtonText("Adding ...")
        setButtonVarient("primary")
        setButtonDisabled(true)

        simulateNetworkRequest()
        .then(() => {
            setLoading(false);
            setButtonText("Added to Google Calendar")
            setButtonVarient("success")
            setButtonDisabled(true)
        })
        .catch((error) => {
            setButtonText("Couldn't add to Google Calendar. Try again?")
            setButtonVarient("danger")
            setButtonDisabled(false)
        })
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant={buttonVarient}
      disabled={buttonDisabled}
      onClick={!isLoading ? handleClick : null}
    >
      {buttonText}
    </Button>
  );
}