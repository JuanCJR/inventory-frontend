"use client";
import { useState } from "react";
import { useMediaDevices } from "react-media-devices";
import { useZxing } from "react-zxing";

const constraints: MediaStreamConstraints = {
  video: true,
  audio: false,
};

export const BarcodeScanner = () => {
  const [result, setResult] = useState("");
  const { devices } = useMediaDevices({ constraints });
  const deviceId = devices?.[2]?.deviceId;
  const { ref } = useZxing({
    // paused: !deviceId,
    // deviceId,
    onResult(result) {
      alert(result.getText());
      setResult(result.getText());
    },
  });

  return (
    <div>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </div>
  );
};
