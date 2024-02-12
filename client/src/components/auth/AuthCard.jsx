import PropTypes from "prop-types";
import { Card } from "antd";

function AuthCard({ children }) {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <Card className="rounded-2xl shadow-md shadow-black max-w-3xl w-full m-1">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <div>{children}</div>
          </div>
          <div className="md:w-1/2 md:ml-4 hidden md:flex md:flex-col md:justify-center rounded-md pattern-background p-3">
            <div className="mb-4 text-3xl font-bold text-center">
              Welcome to GeoPulse
            </div>
            <p className="text-xl text-center">
              Explore countries through dynamic data visualizations on our
              interactive website.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}

AuthCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthCard;
