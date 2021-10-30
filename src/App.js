import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import "./App.css";

import apiClient from "./http-common";

function App() {
  const [getId, setGetId] = useState("");
  const [getTitle, setGetTitle] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");

  const [putId, setPutId] = useState("");
  const [putTitle, setPutTitle] = useState("");
  const [putDescription, setPutDescription] = useState("");
  const [putPublished, setPutPublished] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  const [getResult, setGetResult] = useState(null);
  const [postResult, setPostResult] = useState(null);
  const [putResult, setPutResult] = useState(null);
  const [deleteResult, setDeleteResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isLoadingTutorials, refetch: getAllTutorials } = useQuery(
    "query-tutorials",
    async () => {
      return await apiClient.get("/tutorials");
    },
    {
      enabled: false,
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setGetResult(fortmatResponse(result));
      },
      onError: (err) => {
        setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isLoadingTutorials) setGetResult("loading...");
  }, [isLoadingTutorials]);

  function getAllData() {
    try {
      getAllTutorials();
    } catch (err) {
      setGetResult(fortmatResponse(err));
    }
  }

  const { isLoading: isLoadingTutorial, refetch: getTutorialById } = useQuery(
    "query-tutorial-by-id",
    async () => {
      return await apiClient.get(`/tutorials/${getId}`);
    },
    {
      enabled: false,
      retry: 1,
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setGetResult(fortmatResponse(result));
      },
      onError: (err) => {
        setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isLoadingTutorial) setGetResult("loading...");
  }, [isLoadingTutorial]);

  function getDataById() {
    if (getId) {
      try {
        getTutorialById();
      } catch (err) {
        setGetResult(fortmatResponse(err));
      }
    }
  }

  const { isLoading: isSearchingTutorial, refetch: findTutorialsByTitle } =
    useQuery(
      "query-tutorials-by-title", // ["query-tutorials-by-title", getTitle],
      async () => {
        return await apiClient.get(`/tutorials?title=${getTitle}`);
      },
      {
        enabled: false,
        retry: 1,
        onSuccess: (res) => {
          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };

          setGetResult(fortmatResponse(result));
        },
        onError: (err) => {
          setGetResult(fortmatResponse(err.response?.data || err));
        },
      }
    );

  useEffect(() => {
    if (isSearchingTutorial) setGetResult("searching...");
  }, [isSearchingTutorial]);

  function getDataByTitle() {
    if (getTitle) {
      try {
        findTutorialsByTitle();
      } catch (err) {
        setGetResult(fortmatResponse(err));
      }
    }
  }

  const { isLoading: isPostingTutorial, mutate: postTutorial } = useMutation(
    async () => {
      return await apiClient.post(`/tutorials`, {
        title: postTitle,
        description: postDescription,
      });
    },
    {
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setPostResult(fortmatResponse(result));
      },
      onError: (err) => {
        setPostResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isPostingTutorial) setPostResult("posting...");
  }, [isPostingTutorial]);

  function postData() {
    try {
      postTutorial();
    } catch (err) {
      setPostResult(fortmatResponse(err));
    }
  }

  const { isLoading: isUpdatingTutorial, mutate: updateTutorial } = useMutation(
    async () => {
      return await apiClient.put(`/tutorials/${putId}`, {
        title: putTitle,
        description: putDescription,
        published: putPublished,
      });
    },
    {
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setPutResult(fortmatResponse(result));
      },
      onError: (err) => {
        setPutResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isUpdatingTutorial) setPutResult("updating...");
  }, [isUpdatingTutorial]);

  function putData() {
    if (putId) {
      try {
        updateTutorial();
      } catch (err) {
        setPutResult(fortmatResponse(err));
      }
    }
  }

  const { isLoading: isDeletingTutorials, mutate: deleteAllTutorials } =
    useMutation(
      async () => {
        return await apiClient.delete("/tutorials/");
      },
      {
        onSuccess: (res) => {
          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };

          setDeleteResult(fortmatResponse(result));
        },
        onError: (err) => {
          setDeleteResult(fortmatResponse(err.response?.data || err));
        },
      }
    );

  useEffect(() => {
    if (isDeletingTutorials) setDeleteResult("deleting...");
  }, [isDeletingTutorials]);

  function deleteAllData() {
    try {
      deleteAllTutorials();
    } catch (err) {
      setDeleteResult(fortmatResponse(err));
    }
  }

  const { isLoading: isDeletingTutorial, mutate: deleteTutorial } = useMutation(
    async () => {
      return await apiClient.delete(`/tutorials/${deleteId}`);
    },
    {
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setDeleteResult(fortmatResponse(result));
      },
      onError: (err) => {
        setDeleteResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isDeletingTutorial) setDeleteResult("deleting...");
  }, [isDeletingTutorial]);

  function deleteDataById() {
    if (deleteId) {
      try {
        deleteTutorial();
      } catch (err) {
        setDeleteResult(fortmatResponse(err));
      }
    }
  }

  const clearGetOutput = () => {
    setGetResult(null);
  };

  const clearPostOutput = () => {
    setPostResult(null);
  };

  const clearPutOutput = () => {
    setPutResult(null);
  };

  const clearDeleteOutput = () => {
    setDeleteResult(null);
  };

  return (
    <div id="app" className="container my-3">
      <h3>React Query Axios example</h3>

      <div className="card mt-3">
        <div className="card-header">React Query Axios GET - BezKoder.com</div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-primary" onClick={getAllData}>
              Get All
            </button>

            <input
              type="text"
              value={getId}
              onChange={(e) => setGetId(e.target.value)}
              className="form-control ml-2"
              placeholder="Id"
            />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={getDataById}>
                Get by Id
              </button>
            </div>

            <input
              type="text"
              value={getTitle}
              onChange={(e) => setGetTitle(e.target.value)}
              className="form-control ml-2"
              placeholder="Title"
            />
            <div className="input-group-append">
              <button
                className="btn btn-sm btn-primary"
                onClick={getDataByTitle}
              >
                Find By Title
              </button>
            </div>

            <button
              className="btn btn-sm btn-warning ml-2"
              onClick={clearGetOutput}
            >
              Clear
            </button>
          </div>

          {getResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{getResult}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Query Axios POST - BezKoder.com</div>
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="form-control"
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              className="form-control"
              placeholder="Description"
            />
          </div>
          <button className="btn btn-sm btn-primary" onClick={postData}>
            Post Data
          </button>
          <button
            className="btn btn-sm btn-warning ml-2"
            onClick={clearPostOutput}
          >
            Clear
          </button>

          {postResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{postResult}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Query Axios PUT - BezKoder.com</div>
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              value={putId}
              onChange={(e) => setPutId(e.target.value)}
              className="form-control"
              placeholder="Id"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={putTitle}
              onChange={(e) => setPutTitle(e.target.value)}
              className="form-control"
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={putDescription}
              onChange={(e) => setPutDescription(e.target.value)}
              className="form-control"
              placeholder="Description"
            />
          </div>
          <div className="form-check mb-2">
            <input
              type="checkbox"
              name="putPublished"
              checked={putPublished}
              onChange={(e) => setPutPublished(e.target.checked)}
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="putPublished">
              Publish
            </label>
          </div>
          <button className="btn btn-sm btn-primary" onClick={putData}>
            Update Data
          </button>
          <button
            className="btn btn-sm btn-warning ml-2"
            onClick={clearPutOutput}
          >
            Clear
          </button>

          {putResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{putResult}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">
          React Query Axios DELETE - BezKoder.com
        </div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-danger" onClick={deleteAllData}>
              Delete All
            </button>

            <input
              type="text"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              className="form-control ml-2"
              placeholder="Id"
            />
            <div className="input-group-append">
              <button
                className="btn btn-sm btn-danger"
                onClick={deleteDataById}
              >
                Delete by Id
              </button>
            </div>

            <button
              className="btn btn-sm btn-warning ml-2"
              onClick={clearDeleteOutput}
            >
              Clear
            </button>
          </div>

          {deleteResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{deleteResult}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
