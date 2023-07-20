"use client";
import { BarcodeScanner } from "./BarcodeScanner";
const constraints: MediaStreamConstraints = {
  video: true,
  audio: false,
};

export default function Scanner() {
  return (
    <>
      <BarcodeScanner />
    </>
  );
}
