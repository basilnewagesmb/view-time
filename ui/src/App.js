import { useState, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  const [id, setId] = useState(""); // State to hold the ID
  const [savedId, setSavedId] = useState(null); // State to display the saved ID
  const [isIframeLoading, setIsIframeLoading] = useState(true); // Track iframe loading state

  // Load saved ID from local storage on component mount
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setSavedId(storedId);
    }
  }, []);

  // Handle form submission to save ID
  const handleSaveId = useCallback(
    (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      localStorage.setItem("userId", id); // Save ID to local storage
      setSavedId(id); // Update the saved ID state
      setId(""); // Clear the input field
    },
    [id]
  );

  // Handle delete action to remove ID
  const handleDeleteId = useCallback(() => {
    localStorage.removeItem("userId"); // Remove ID from local storage
    setSavedId(null); // Clear the saved ID state
  }, []);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsIframeLoading(false); // Set iframe loading state to false when iframe finishes loading
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="./icon-32.png" alt="logo" />
          When Can I Leave
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {savedId ? (
              <>
                <button
                  onClick={handleDeleteId}
                  className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900"
                >
                  Delete ID
                </button>

                <div
                  className={`iframe-container ${
                    isIframeLoading ? "loading" : ""
                  }`}
                >
                  <iframe
                    style={{ width: "100%", height: "200px" }}
                    src={`https://get-time-text-4husm0ou9-basilnewagesmb.vercel.app/${savedId}`}
                    title="W3Schools Free Online Web Tutorials"
                    onLoad={handleIframeLoad}
                  ></iframe>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Save ID
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSaveId}
                >
                  <div>
                    <label
                      htmlFor="id"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your ID
                    </label>
                    <input
                      type="text"
                      name="id"
                      id="id"
                      value={id} // Controlled input value
                      onChange={(e) => setId(e.target.value)} // Update state on input change
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="3317"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Save
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
