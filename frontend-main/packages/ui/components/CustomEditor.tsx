"use client";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import { Dispatch, SetStateAction } from "react";
import { adminBlogImageUpload } from "../utils/api";

interface Props {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const CustomEditor = ({ content, setContent }: Props) => {
  const cloud = useCKEditorCloud({
    version: "45.0.0",
    premium: true,
  });

  if (cloud.status === "error") {
    return <div>Error!</div>;
  }

  if (cloud.status === "loading") {
    return <div>Loading...</div>;
  }

  const {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Link,
    List,
    Image,
    ImageToolbar,
    ImageUpload,
    BlockQuote,
    Table,
    TableToolbar,
    Undo,
    Heading,
  } = cloud.CKEditor;

  function CustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return {
        upload: () => {
          return loader.file.then((file: File) => {
            return new Promise((resolve, reject) => {
              // Önizleme için base64
              const reader = new FileReader();

              reader.onload = async () => {
                try {
                  // Upload için FormData
                  const formData = new FormData();
                  formData.append("file", file);

                  const response: any = await adminBlogImageUpload(formData);
                  console.log("response: ", response);
                  // CKEditor'a yüklenen resmin URL'sini ver
                  resolve({
                    default: response.url || reader.result, // backend'in döndürdüğü URL
                  });
                } catch (error) {
                  reject(error);
                }
              };

              reader.onerror = (error) => {
                reject(error);
              };

              reader.readAsDataURL(file); // Önizleme için
            });
          });
        },
        abort: () => {
          // Gerekirse loader.abort() vs.
        },
      };
    };
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onReady={(editor) => {
        const view = editor.editing.view;
        const root = view.document.getRoot();

        view.change((writer) => {
          if (root) {
            const currentClass = root.getAttribute("class") || "";
            writer.setAttribute("class", `${currentClass} custom-editor`, root);
          }
        });
      }}
      onChange={(_, editor) => {
        const data = editor.getData();
        setContent(data);
      }}
      config={{
        licenseKey:
          "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzU2OTI3OTksImp0aSI6IjY4OGFmNjQ5LWNiM2YtNDk1Yi1iOTNjLWZhZGZhOGQxY2MzMSIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiMmEyMjg0ZTEifQ.NM9Uki_oikNg3CwK2b_g1ZjeUeK4jUAcYZAf4AOmwgHfo8VcS1725edTjiY1GSMv49KzUoHpjaHkIlr8diKbTg",
        plugins: [
          Heading,
          Essentials,
          Paragraph,
          Bold,
          Italic,
          Link,
          List,
          Image,
          ImageToolbar,
          ImageUpload,
          BlockQuote,
          Table,
          TableToolbar,
          Undo,
        ],
        toolbar: [
          "heading",
          "paragraph",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "imageUpload",
          "blockQuote",
          "insertTable",
          "undo",
          "redo",
        ],
        extraPlugins: [CustomUploadAdapterPlugin],
      }}
    />
  );
};

export default CustomEditor;
