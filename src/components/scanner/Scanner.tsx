"use client";
import { useState } from "react";
import { useMediaDevices } from "react-media-devices";
import { useZxing } from "react-zxing";
import styles from "./Scanner.module.css";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
const constraints: MediaStreamConstraints = {
  video: true,
  audio: false,
};

interface ScannerProps {
  handleChangeCode: (result: string) => void;
}

export const Scanner = (props: ScannerProps) => {
  const { handleChangeCode } = props;
  const [result, setResult] = useState("");
  const { devices } = useMediaDevices({ constraints });

  const deviceId = devices?.[2]?.deviceId;
  const [devicesUsed, setDevicesUsed] = useState(deviceId);
  const { ref } = useZxing({
    deviceId: devicesUsed,
    timeBetweenDecodingAttempts: 200,
    constraints: {
      video: {
        width: { ideal: 1920 }, // Ancho ideal
        height: { ideal: 1080 }, // Alto ideal
        facingMode: "environment", // Cámara trasera
        frameRate: { ideal: 30 }, // Tasa de cuadros ideal
        aspectRatio: { ideal: 1.7778 }, // Relación de aspecto ideal (16:9)
      },
    },
    onResult(result) {
      handleChangeCode(result.getText());
    },
  });
  return (
    <div className={styles.scanner}>
      <video ref={ref} className={styles.scanner} />
      <div className={styles["overlay-figure"]}>
        <div className={styles["line-horizontal"]}></div>
        <div className={styles["line-vertical"]}></div>
      </div>
      <FormControl mt={2}>
        <FormLabel>Camara</FormLabel>
        <Select
          placeholder="Seleccionar dispositivo"
          onChange={(e) => {
            const newdeviceId = e.target.value;
            setDevicesUsed(newdeviceId);
          }}
        >
          {devices?.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || device.kind}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
