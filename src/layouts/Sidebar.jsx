import { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ResetConfirmation from "../features/page/components/ResetConfirmation";
import usePage from "../hooks/usePage";

export default function Sidebar() {
  const [openResetModal, setOpenResetModal] = useState(false);
  const { renderedPage, setRenderedPage } = usePage();

  const isPage = (num) => (renderedPage === num ? "white" : "green");

  return (
    <>
      <nav className="fixed bg-slate-100 shadow-lg left-0 z-40 w-52 h-screen p-4">
        <div className="flex flex-col pb-10 h-full items-center justify-between">
          <div className="flex flex-col gap-2">
            <Button onClick={() => setRenderedPage(1)} color={isPage(1)}>
              Wishing
            </Button>
            <Button onClick={() => setRenderedPage(2)} color={isPage(2)}>
              Fate Store
            </Button>
            <Button onClick={() => setRenderedPage(3)} color={isPage(3)}>
              Primogem Store
            </Button>
            <Button onClick={() => setRenderedPage(4)} color={isPage(4)}>
              Blessing of the Welkin Moon
            </Button>
            <Button onClick={() => setRenderedPage(5)} color={isPage(5)}>
              Starglitter & Stardust Store
            </Button>
          </div>
          <div>
            <Button color="black" onClick={() => setOpenResetModal(true)}>
              Reset All History and Currency
            </Button>
          </div>
        </div>
      </nav>
      <Modal
        title="Reset Confirmation"
        width="24"
        open={openResetModal}
        onClose={() => setOpenResetModal(false)}
      >
        <ResetConfirmation onSuccess={() => setOpenResetModal(false)} />
      </Modal>
    </>
  );
}
