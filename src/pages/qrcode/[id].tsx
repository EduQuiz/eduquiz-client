import { useRouter } from "next/router";
import type React from "react";

const QRCode: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  const size = "300x300";

  return (
    <div className="flex justify-center items-center m-10 p-10 bg-white">
      <img
        src={`https://api.qrserver.com/v1/create-qr-code?size=${size}&data=http://localhost:3000/responder/${id}`}
        alt={`http://localhost:3000/responder/${id}`}
      />
    </div>
  );
};

export default QRCode;
