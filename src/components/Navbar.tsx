import { Fragment, useState } from "react";
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../lib/firebase";
import { useUser } from "../context/UserContext";
import logo from "../assets/logo.png";
import userIcon from "../assets/user_icon.png";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Dialog, Transition } from "@headlessui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const { user, setUser } = useUser();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      await saveUserToFirestore(result.user);
      setIsOpen(false);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const saveUserToFirestore = async (user: any) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        displayName: user.displayName || "Анонім",
        email: user.email,
        photoURL: user.photoURL || "/default-avatar.png",
        createdAt: new Date(),
      });
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isRegister) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        let avatarUrl = "/default-avatar.png";

        if (avatar) {
          const avatarRef = ref(storage, `avatars/${userCredential.user.uid}`);
          await uploadBytes(avatarRef, avatar);
          avatarUrl = await getDownloadURL(avatarRef);
          await updateProfile(userCredential.user, { photoURL: avatarUrl });
        }

        await updateProfile(userCredential.user, {
          displayName: email.split("@")[0],
        });
        await saveUserToFirestore({
          ...userCredential.user,
          photoURL: avatarUrl,
        });
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      setUser(userCredential.user);
      setIsOpen(false);
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      className="sticky top-0 left-0 w-full h-16 flex justify-between items-center z-50 bg-gradient-to-b from-black/50 to-black/20 px-6"
      style={{ padding: "0 20px" }}
    >
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-12 w-12" />
        <p className="text-white text-xl font-bold">MetaQuest</p>
      </div>
      <div className="flex items-center gap-6">
        {!user ? (
          <button
            onClick={() => setIsOpen(true)}
            className="text-white text-lg font-bold hover:underline"
          >
            Увійти
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <p className="text-white text-lg font-bold">
              {user.displayName || user.email}
            </p>
            <img
              src={user.photoURL || userIcon}
              alt="User Icon"
              className="h-12 w-12 rounded-full border-2 border-white cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        )}
      </div>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
          onClose={() => setIsOpen(false)}
        >
          <Dialog.Panel className="bg-gray-900 p-8 rounded-lg shadow-lg w-96 text-white">
            <Dialog.Title className="text-xl font-bold mb-4 text-center">
              {isRegister ? "Реєстрація" : "Вхід"} в MetaQuest
            </Dialog.Title>
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Пароль"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {isRegister && (
                <input
                  type="file"
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  required
                />
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
              >
                {isRegister ? "Зареєструватись" : "Увійти"}
              </button>
            </form>
            <button
              onClick={handleLogin}
              className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 rounded transition"
            >
              Увійти через Google
            </button>
            <p
              className="mt-4 text-center text-gray-400 cursor-pointer hover:text-white"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister
                ? "Вже є акаунт? Увійти"
                : "Немає акаунта? Зареєструватись"}
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full text-gray-400 hover:text-white transition"
            >
              Назад
            </button>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Navbar;
