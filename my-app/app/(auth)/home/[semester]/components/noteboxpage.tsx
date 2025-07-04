"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from 'next/navigation'; // Changed: Remove useSearchParams, add useParams
import { useForm } from "react-hook-form";
import { handledeletenote, handlenoteboxdata } from "./handlenoteboxdata";
import { useFetchData } from "@/fetch_Data_query/useFetchData";
import { X, SquarePlus, NotebookIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handlenewnote, handleeditnote } from "./handlenewnote";
import ImageComponent from "./ImageComponent";
import Image from "next/image";
import { handleImageBucket } from "./handleImages";

type NoteType = {
  title: string;
  description: string;
  id: number;
  Image?: string;
  Semester: number;
};

type FormInputs = {
  title: string;
  description: string;
};

const Noteboxpage = () => {
  const { data: userdata } = useFetchData();
  const params = useParams(); // Changed: Use useParams instead of useSearchParams
  const router = useRouter();
  
  const currentSemester = parseInt(params.semester as string || '1'); // Changed: Get semester from params
  
  const [selectedNote, setselectedNote] = useState<NoteType | null>(null);
  const [Notes, setNotes] = useState<NoteType[]>([]);
  const [showPopover, setShowPopover] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localNoteCount, setLocalNoteCount] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);

  const {
    register: createRegister,
    handleSubmit: handleCreateSubmit,
    formState: { errors: createErrors },
    reset,
  } = useForm<FormInputs>();

  const {
    register: editRegister,
    handleSubmit: handleEditSubmit,
    setValue,
  } = useForm<FormInputs>();

  const openModal = (note: NoteType) => {
    setselectedNote(note);
  };

  const closeModal = () => {
    setselectedNote(null);
    setShowEditModal(false);
    setValue("title", "");
    setValue("description", "");
  };

  const openEditModal = (note: NoteType) => {
    setValue("title", note.title);
    setValue("description", note.description);
    setEditFile(null); // Reset edit file
    setShowEditModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const closeEditModal = () => {
    setShowEditModal(false);
    setValue("title", "");
    setValue("description", "");
    setEditFile(null);
  };

   const updateSemester = (newSemester: number) => {
    router.push(`/home/${newSemester}`);
  };

  const fetcher = useCallback(async () => {
    if (!userdata?.id) return;
    const data: NoteType[] = await handlenoteboxdata(userdata.id, currentSemester); // Pass currentSemester
    setNotes(data);
    return data;
  }, [userdata?.id, currentSemester]); // Add currentSemester to dependencies

  const onCreateSubmit = async (data: FormInputs) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const createNoteResult = await handlenewnote(
        userdata?.id,
        data.title,
        data.description,
        currentSemester, // Use currentSemester instead of hardcoded semester
        userdata?.Notecount
      );

      setLocalNoteCount((prevCount) => Number(prevCount + 1));

      if (createNoteResult?.success && createNoteResult?.noteId) {
        // If we have a file, upload the image
        if (file) {
          try {
            await handleImageBucket(file.name, file, createNoteResult.noteId);
          } catch (imageError) {
            console.error("Error uploading image:", imageError);
          }
        }

        await fetcher(); // Refresh the notes list
        setShowPopover(false);
        setFile(null);
        reset();
      } else {
        throw new Error("Failed to create note");
      }
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onEditSubmit = async (data: FormInputs) => {
    if (!selectedNote?.id || isLoading) return;
    setIsLoading(true);
    try {
      const check = await handleeditnote(
        selectedNote.id,
        data.title,
        data.description,
        userdata?.id
      );

      if (check) {
        // If we have a new file, upload it
        if (editFile) {
          try {
            await handleImageBucket(editFile.name, editFile, selectedNote.id);
            // Refresh notes to get the updated image URL
            await fetcher();
          } catch (imageError) {
            console.error("Error uploading image:", imageError);
          }
        } else {
          // If no new image, update the notes state directly
          setNotes((prevNotes) =>
            prevNotes.map((note) =>
              note.id === selectedNote.id
                ? { ...note, title: data.title, description: data.description }
                : note
            )
          );
        }

        // Update the selected note state
        setselectedNote((prev) =>
          prev
            ? {
                ...prev,
                title: data.title,
                description: data.description,
              }
            : null
        );

        closeEditModal();
      }
    } catch (error) {
      console.error("Error editing note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (noteId: number) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await handledeletenote(userdata?.id, noteId, userdata?.Notecount);
      await fetcher(); // Refresh notes after deletion
      closeModal(); // Close the modal after successful deletion
      // Update local note count
      if (localNoteCount > -1) {
        setLocalNoteCount((prevCount) => Number(prevCount - 1));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userdata?.id) return;

    fetcher();
  }, [userdata?.id, fetcher, currentSemester, localNoteCount, userdata?.Notecount]); // Add currentSemester

  if (!userdata?.id) {
    return (
      <div className="flex justify-center items-center mt">
        <p className="text-emerald-300 text-xl animate-pulse">
          Loading your notes...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center overflow-x-hidden no-scrollbar mx-10 h-screen mb-10">
      {/* Add Semester Selector */}
      <div className="w-full mb-6 flex justify-center">
        <div className="bg-emerald-800/50 p-4 rounded-xl backdrop-blur-xl border border-emerald-200/20">
          <label className="text-emerald-100 text-lg block mb-2 text-center">
            Select Semester:
          </label>
          <select
            value={currentSemester}
            onChange={(e) => updateSemester(parseInt(e.target.value))}
            className=" bg-emerald-700 text-emerald-100 p-3 rounded-lg border border-emerald-600 min-w-[150px] cursor-pointer hover:bg-emerald-600 transition-colors"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Update header to show current semester */}
      <div className="flex w-full bg-emerald-950 mb-8 pb-4 border rounded-3xl border-transparent">
        <div className="w-[59%] text-end">
          <p className="mt-4 text-emerald-100 drop-shadow-md text-2xl font-bold mr-8">
            My Notes - Semester {currentSemester}
          </p>
        </div>
        <div className="text-emerald-400 justify-end items-end px-10 flex w-[45%]">
          <SquarePlus
            size={32}
            onClick={() => !isLoading && setShowPopover((prev) => !prev)}
            className={`cursor-pointer ${isLoading ? "opacity-50" : ""}`}
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-10">
        <div className="gap-4 text-emerald-50 w-[30%] h-[10vh] md:w-[20%] md:h-[20vh] bg-emerald-900/60 hover:bg-emerald-500 hover:transition-all hover:duration-300 backdrop-blur-lg rounded-xl shadow-lg border border-emerald-200/20 flex items-center justify-center">
          <div className="items-start flex-shrink-0">
            <NotebookIcon className="w-6 h-6 md:w-12 md:h-12" />
          </div>
          <div className="flex flex-col">
            <div className="text-start font-bold text-base md:text-2xl lg:text-3xl">
              {Notes.length} 
            </div>
            <div className="text-xs md:text-md lg:text-lg">Total notes

            </div>
          </div>
        </div>
        <div className="gap-4 text-emerald-50 w-[30%] h-[10vh] md:w-[20%] md:h-[20vh] bg-emerald-900/60 hover:bg-emerald-500 hover:transition-all hover:duration-300 backdrop-blur-lg rounded-xl shadow-lg border border-emerald-200/20 flex items-center justify-center">
          <div className="items-start flex-shrink-0">
            <Plus className="w-6 h-6 md:w-12 md:h-12" />
          </div>
          <div className="flex flex-col">
            <div className="text-start font-bold text-base  md:text-2xl lg:text-3xl">
              120
            </div>
            <div className="text-xs md:text-md lg:text-lg">MB used</div>
          </div>
        </div>
      </div>

      {/* Create Note Popover */}
      {showPopover && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center overflow-y-auto no-scrollbar"
          onClick={() => !isLoading && setShowPopover(false)}
        >
          <div
            className="relative my-4 mx-auto bg-emerald-700/60 p-5 rounded-xl backdrop-blur-xl shadow-2xl border border-emerald-200/20 w-[90%] max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[85vh] overflow-y-auto no-scrollbar px-2">
              {/* Add semester indicator */}
              <div className="mb-4 p-3 bg-emerald-600/40 rounded-lg border border-emerald-500/30">
                <p className="text-emerald-100 text-center">
                  Creating note for <span className="font-bold">Semester {currentSemester}</span>
                </p>
              </div>
              
              <form
                onSubmit={handleCreateSubmit(onCreateSubmit)}
                className="flex flex-col gap-8"
              >
                <div>
                  <label className="text-emerald-100 drop-shadow-lg text-lg block mb-2">
                    Title
                  </label>
                  <Input
                    {...createRegister("title", {
                      required: "Title is required",
                      minLength: {
                        value: 3,
                        message: "Title must be at least 3 characters",
                      },
                      maxLength: {
                        value: 10,
                        message: "Title must be less than 10 characters",
                      },
                    })}
                    className="text-emerald-50"
                    disabled={isLoading}
                  />
                  {createErrors.title && (
                    <span className="text-red-400 text-sm">
                      {createErrors.title.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-emerald-100 drop-shadow-lg text-lg block mb-2">
                    Description
                  </label>
                  <Textarea
                    {...createRegister("description", {
                      required: "Description is required",
                    })}
                    className="text-emerald-50 min-h-[100px]"
                    disabled={isLoading}
                  />
                  {createErrors.description && (
                    <span className="text-red-400 text-sm">
                      {createErrors.description.message}
                    </span>
                  )}
                </div>
                <div>
                  <ImageComponent onFileSelect={setFile} />
                </div>
                <Button
                  type="submit"
                  className="bg-emerald-100 text-emerald-950 hover:bg-emerald-950 hover:text-emerald-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create +"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      {showEditModal && selectedNote && (
        <div
          className="fixed inset-0 bg-black/60 z-99 flex items-center justify-center overflow-y-auto no-scrollbar"
          onClick={() => !isLoading && closeEditModal()}
        >
          <div
            className="relative my-4 mx-auto bg-emerald-700/60 p-5 rounded-xl backdrop-blur-xl shadow-2xl border border-emerald-200/20 w-[90%] max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[85vh] overflow-y-auto no-scrollbar px-2">
              <div className="flex justify-between items-center mb-6 sticky top-0 bg-emerald-700/95 py-2 -mx-2 px-2">
                <h3 className="text-emerald-100 text-xl font-bold">
                  Edit Note
                </h3>
                <button
                  onClick={() => !isLoading && closeEditModal()}
                  className="p-2 rounded-full bg-emerald-600/80 hover:bg-emerald-600 text-white transition-colors duration-200"
                  disabled={isLoading}
                >
                  <X size={20} />
                </button>
              </div>
              <form
                onSubmit={handleEditSubmit(onEditSubmit)}
                className="flex flex-col gap-8"
              >
                <div>
                  <label className="text-emerald-100 drop-shadow-lg text-lg block mb-2">
                    Title
                  </label>
                  <Input
                    {...editRegister("title", {
                      required: "Title is required",
                      minLength: {
                        value: 3,
                        message: "Title must be at least 3 characters",
                      },
                      maxLength: {
                        value: 10,
                        message: "Title must be less than 10 characters",
                      },
                    })}
                    className="text-emerald-50"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="text-emerald-100 drop-shadow-lg text-lg block mb-2">
                    Description
                  </label>
                  <Textarea
                    {...editRegister("description", {
                      required: "Description is required",
                    })}
                    className="text-emerald-50 min-h-[150px]"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  {selectedNote.Image && !editFile && (
                    <div className="mb-4">
                      <p className="text-emerald-100 mb-2">Current Image:</p>
                      <Image
                        src={selectedNote.Image}
                        alt={selectedNote.title}
                        width={200}
                        height={200}
                        className="rounded-md"
                      />
                    </div>
                  )}
                  <ImageComponent onFileSelect={setEditFile} />
                </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-emerald-100 text-emerald-950 hover:bg-emerald-950 hover:text-emerald-100"
                    onClick={() => !isLoading && closeEditModal()}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-emerald-100 text-emerald-950 hover:bg-emerald-950 hover:text-emerald-100"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="w-full flex items-center justify-center px-4">
        <div className="overflow-x-auto mt-10 w-full max-w-6xl rounded-xl border border-emerald-600/40 shadow-2xl">
          <table className="w-full table-auto bg-emerald-950/50 text-left rounded-xl">
            <thead className="bg-emerald-800/60 text-emerald-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold tracking-wide">
                  Title
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wide">
                  Description
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wide">
                  Semester
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wide">
                  Image
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-700/30">
              {Notes.map((note, index) => (
                <tr
                  key={index}
                  onClick={() => openModal(note)}
                  className="hover:bg-emerald-800/30 cursor-pointer transition-all duration-200"
                >
                  <td className="px-6 py-4 text-emerald-100 font-medium whitespace-nowrap">
                    {note.title}
                  </td>
                  <td className="px-6 py-4 text-emerald-200 max-w-xl truncate">
                    {note.description
                      .split("\n")
                      .slice(0, 2)
                      .join(" ")
                      .slice(0, 100)}
                    {note.description.length > 100 && "..."}
                  </td>
                  <td className="px-6 py-4 text-emerald-300">
                    Sem {note.Semester}
                  </td>
                  <td className="px-6 py-4">
                    {note.Image && (
                      <Image
                        src={note.Image}
                        alt={note.title}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Show message if no notes for current semester */}
          {Notes.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-emerald-300 text-lg">
                No notes found for Semester {currentSemester}
              </p>
              <p className="text-emerald-400 text-sm mt-2">
                Click the + button to create your first note for this semester
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Note Details Modal */}
      {selectedNote && (
        <div
          className={`fixed inset-0 bg-black/60 z-50 flex items-center justify-center overflow-y-auto no-scrollbar ${
            showEditModal ? "pointer-events-none" : ""
          }`}
          onClick={() => !isLoading && closeModal()}
        >
          <div
            className="relative my-4 mx-auto bg-emerald-700/60 p-5 rounded-xl backdrop-blur-xl shadow-2xl border border-emerald-200/20 w-[90%] max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[85vh] overflow-y-auto no-scrollbar px-2">
              <div className="flex justify-between items-center mb-4 sticky top-0 bg-emerald-700/95 py-2 -mx-2 px-2">
                <h3 className="text-emerald-100 text-lg font-semibold">
                  {selectedNote.title}
                </h3>
                <button
                  onClick={() => !isLoading && closeModal()}
                  className="p-2 rounded-full bg-emerald-600/80 hover:bg-emerald-600 text-white transition-colors duration-200"
                  disabled={isLoading}
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-emerald-200 mb-4">
                {selectedNote.description}
              </p>
              {selectedNote.Image && (
                <div className="mb-4">
                  <Image
                    src={selectedNote.Image}
                    alt={selectedNote.title}
                    width={500}
                    height={300}
                    className="rounded-md w-full h-auto"
                  />
                </div>
              )}
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  className="bg-red-100 text-red-950 hover:bg-red-950 hover:text-red-100"
                  onClick={() => !isLoading && handleDelete(selectedNote.id)}
                  disabled={isLoading}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  className="bg-emerald-100 text-emerald-950 hover:bg-emerald-950 hover:text-emerald-100"
                  onClick={() => !isLoading && closeModal()}
                  disabled={isLoading}
                >
                  Close
                </Button>
                <Button
                  className="bg-emerald-100 text-emerald-950 hover:bg-emerald-950 hover:text-emerald-100"
                  onClick={() => openEditModal(selectedNote)}
                  disabled={isLoading}
                >
                  Edit Note
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Noteboxpage;
