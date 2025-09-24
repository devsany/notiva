"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Moon,
  Sun,
  Save,
  X,
  Download,
  Trash2,
  FileText,
} from "lucide-react";

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });

  // Load data from memory on component mount
  useEffect(() => {
    // Initialize with some sample data if needed
    const sampleNotes = [];
    setNotes(sampleNotes);
  }, []);

  // Generate unique ID
  const generateId = () =>
    Date.now().toString(36) + Math.random().toString(36).substr(2);

  // Save note
  const saveNote = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please enter both title and content");
      return;
    }

    const now = new Date();
    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    if (currentNote) {
      // Update existing note
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === currentNote.id
            ? { ...note, ...formData, tags, updatedAt: now }
            : note
        )
      );
    } else {
      // Create new note
      const newNote = {
        id: generateId(),
        ...formData,
        tags,
        createdAt: now,
        updatedAt: now,
      };
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    }

    closeEditor();
  };

  // Create new note
  const createNewNote = () => {
    setCurrentNote(null);
    setFormData({ title: "", content: "", category: "", tags: "" });
    setIsEditing(true);
  };

  // Edit note
  const editNote = (note) => {
    setCurrentNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category || "",
      tags: note.tags ? note.tags.join(", ") : "",
    });
    setIsEditing(true);
  };

  // Delete note
  const deleteNote = (noteId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    }
  };

  // Close editor
  const closeEditor = () => {
    setIsEditing(false);
    setCurrentNote(null);
    setFormData({ title: "", content: "", category: "", tags: "" });
  };

  // Export note
  const exportNote = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please enter title and content first");
      return;
    }

    const exportContent = `# ${formData.title}\n\n${formData.content}`;
    const blob = new Blob([exportContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter and sort notes
  const getFilteredNotes = () => {
    let filtered = [...notes];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (note.tags &&
            note.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter((note) => note.category === categoryFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "date-desc":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  };

  const filteredNotes = getFilteredNotes();

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div
            className={`lg:col-span-1 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } rounded-2xl p-6 shadow-xl border transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-indigo-600" />
                <h1 className="text-xl font-bold text-indigo-600">Notes App</h1>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode
                    ? "bg-yellow-500 text-gray-900"
                    : "bg-gray-800 text-yellow-400"
                }`}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Filters */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className={`w-full p-2 rounded-lg border transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">All Categories</option>
                  <option value=""></option>
                  <option value="personal">Personal</option>
                  <option value="ideas">Ideas</option>
                  <option value="todo">Todo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`w-full p-2 rounded-lg border transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="title-asc">Title A-Z</option>
                  <option value="title-desc">Title Z-A</option>
                </select>
              </div>
            </div>

            {/* New Note Button */}
            <button
              onClick={createNewNote}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 mb-6"
            >
              <Plus className="w-4 h-4" />
              New Note
            </button>

            {/* Stats */}
            <div
              className={`text-center p-4 rounded-xl ${
                isDarkMode ? "bg-gray-700" : "bg-indigo-50"
              }`}
            >
              <div className="text-2xl font-bold text-indigo-600 mb-1">
                {notes.length}
              </div>
              <div className="text-sm opacity-70">Total Notes</div>
            </div>
          </div>

          {/* Main Content */}
          <div
            className={`lg:col-span-3 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } rounded-2xl p-6 shadow-xl border transition-all duration-300`}
          >
            {!isEditing ? (
              // Notes List
              <div>
                {filteredNotes.length === 0 ? (
                  <div className="text-center py-16">
                    <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No notes yet</h3>
                    <p className="text-gray-500 mb-6">
                      Create your first note to get started!
                    </p>
                    <button
                      onClick={createNewNote}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                    >
                      Create Note
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredNotes.map((note) => (
                      <div
                        key={note.id}
                        onClick={() => editNote(note)}
                        className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg relative group ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 hover:border-indigo-500"
                            : "bg-gray-50 border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <button
                          onClick={(e) => deleteNote(note.id, e)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all duration-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>

                        <h3 className="font-semibold mb-2 text-lg line-clamp-1">
                          {note.title}
                        </h3>
                        <p
                          className={`text-sm mb-3 line-clamp-3 ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {note.content}
                        </p>

                        <div className="flex justify-between items-center text-xs">
                          <span
                            className={
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }
                          >
                            {new Date(note.createdAt).toLocaleDateString()}
                          </span>
                          {note.category && (
                            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
                              {note.category}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Note Editor
              <div className="space-y-4">
                {/* Editor Header */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold">
                    {currentNote ? "Edit Note" : "New Note"}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={exportNote}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-300 ${
                        isDarkMode
                          ? "border-gray-600 hover:bg-gray-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    <button
                      onClick={saveNote}
                      className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={closeEditor}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-300 ${
                        isDarkMode
                          ? "border-gray-600 hover:bg-gray-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <X className="w-4 h-4" />
                      Close
                    </button>
                  </div>
                </div>

                {/* Title Input */}
                <input
                  type="text"
                  placeholder="Enter note title..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={`w-full p-4 text-xl font-semibold rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />

                {/* Meta Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-100"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="">Select Category</option>
                    <option value=""></option>
                    <option value="personal">Personal</option>
                    <option value="ideas">Ideas</option>
                    <option value="todo">Todo</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className={`p-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                </div>

                {/* Content Textarea */}
                <textarea
                  placeholder="Start writing your note..."
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={20}
                  className={`w-full p-4 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesApp;
