import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";

import { post, put } from "../../Services/APIUtils";
import handleError from "../../Utils/handleError";

export const PostsForm = (props) => {
  const { postItem, setshow } = props;
  const isAddMode = !postItem;

  let id;

  if (postItem) {
    id = postItem.id;
  }

  const history = useHistory();

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });

  // functions to build form returned by useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    errors,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function onSubmit(data) {
    return isAddMode ? createUser(data) : updateUser(id, data);
  }

  function createUser(data) {
    return post(`posts/`, data)
      .then(() => {
        alert("Post added", { keepAfterRouteChange: true });
        setshow(false);
        // history.push(".");
      })
      .catch((error) => handleError(error));
  }

  function updateUser(id, data) {
    return put(`posts/${id}`, data)
      .then(() => {
        alert("Post updated", { keepAfterRouteChange: true });
        setshow(false);
        // history.push("..");
      })
      .catch((error) => handleError(error));
  }

  useEffect(() => {
    if (!isAddMode) {
      // get post and set form fields
      const fields = ["id", "userId", "title", "body"];
      fields.forEach((field) => setValue(field, postItem[field]));
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <h1>{isAddMode ? "Add Post" : "Edit Post"}</h1>
      <div className="form-row">
        <div className="form-group col-5">
          <label>User Id</label>
          <input
            name="userId"
            type="text"
            ref={register}
            className={`form-control ${errors.userId ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.userId?.message}</div>
        </div>
        <div className="form-group col-5">
          <label>Title</label>
          <input
            name="title"
            type="text"
            ref={register}
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.title?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-10">
          <label>Description</label>
          <textarea
            name="body"
            type="textarea"
            rows={3}
            ref={register}
            className={`form-control ${errors.body ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.body?.message}</div>
        </div>
      </div>
      <div className="form-group">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Save
        </button>
        <Link to={isAddMode ? "." : ".."} className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
};
