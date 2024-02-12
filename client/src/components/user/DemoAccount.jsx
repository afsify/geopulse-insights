import { Fragment } from "react";
import toast from "react-hot-toast";
import { Button, Tooltip } from "antd";
import { MailOutline, VpnKey } from "@mui/icons-material";

function DemoAccount() {
  const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
  const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} Copied to Clipboard!`);
  };

  return (
    <Fragment>
      {demoEmail && demoPassword ? (
        <div className="mt-4 flex flex-col justify-center items-center font-semibold">
          <div className="flex gap-x-2 items-center mb-2">
            <Tooltip title="Copy Email">
              <Button
                type="text"
                size="small"
                icon={<MailOutline fontSize="small" />}
                onClick={() => copyToClipboard(demoEmail, "Email")}
              />
            </Tooltip>
            <p>{demoEmail}</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <Tooltip title="Copy Password">
              <Button
                type="text"
                size="small"
                icon={<VpnKey fontSize="small" />}
                onClick={() => copyToClipboard(demoPassword, "Password")}
              />
            </Tooltip>
            <p>{demoPassword}</p>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}

export default DemoAccount;
