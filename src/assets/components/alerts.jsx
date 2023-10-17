export function ScreenAlert(meddelande) {
  return (
    <>
      <dialog id="dialogThing">
        <p>{meddelande}</p>
        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog>
    </>
  );
}

export function BottomAlert(meddelande) {
  return (
    <>
      <dialog id="dialogThing">
        <p>{meddelande}</p>
        <form method="dialog">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
}

