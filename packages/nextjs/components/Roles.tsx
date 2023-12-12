import React from "react";
// import { useAccount } from 'wagmi'
import { useRoles } from "~~/hooks/scaffold-eth";

export const Roles = () => {
  const { isBlister, isMMinter, isOwner, isPauser, isRescuer, isMinter } = useRoles();
  return (
    <div
      style={{ padding: 0, borderRadius: 10 }}
      className="top-0 bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md  px-0 sm:px-2"
    >
      <div className="stats shadow">
        <div style={{ padding: 2 }} className="stat place-items-center">
          <div style={{ fontSize: 12, fontWeight: "bold" }} className="stat-title">
            Owner
          </div>
          <div className="stat-value">
            {isOwner ? (
              <svg
                fill="green"
                viewBox="0 0 16 16"
                height="25px"
                width="25px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <path d="M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 01.02-.022z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 470 1000"
                fill="red"
                height="25px"
                width="25px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <path d="M452 656c12 12 18 26.333 18 43s-6 31-18 43c-12 10.667-26.333 16-43 16s-31-5.333-43-16L234 590 102 742c-12 10.667-26.333 16-43 16s-31-5.333-43-16C5.333 730 0 715.667 0 699s5.333-31 16-43l138-156L16 342C5.333 330 0 315.667 0 299s5.333-31 16-43c12-10.667 26.333-16 43-16s31 5.333 43 16l132 152 132-152c12-10.667 26.333-16 43-16s31 5.333 43 16c12 12 18 26.333 18 43s-6 31-18 43L314 500l138 156" />
              </svg>
            )}
          </div>
        </div>

        <div style={{ padding: 2 }} className="stat place-items-center">
          <div style={{ fontSize: 12, fontWeight: "bold" }} className="stat-title">
            M/Minter
          </div>
          <div className="stat-value">
            {isMMinter ? (
              <svg
                fill="green"
                viewBox="0 0 16 16"
                height="25px"
                width="25px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <path d="M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 01.02-.022z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 470 1000"
                fill="red"
                height="25px"
                width="25px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <path d="M452 656c12 12 18 26.333 18 43s-6 31-18 43c-12 10.667-26.333 16-43 16s-31-5.333-43-16L234 590 102 742c-12 10.667-26.333 16-43 16s-31-5.333-43-16C5.333 730 0 715.667 0 699s5.333-31 16-43l138-156L16 342C5.333 330 0 315.667 0 299s5.333-31 16-43c12-10.667 26.333-16 43-16s31 5.333 43 16l132 152 132-152c12-10.667 26.333-16 43-16s31 5.333 43 16c12 12 18 26.333 18 43s-6 31-18 43L314 500l138 156" />
              </svg>
            )}
          </div>
        </div>
        <div style={{ padding: 2 }} className="stat place-items-center">
          <div style={{ fontSize: 12, fontWeight: "bold" }} className="stat-title">
            Pauser
          </div>
          <div className="stat-value">
            {isPauser ? (
              <svg
                fill="green"
                viewBox="0 0 16 16"
                height="25px"
                width="25px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <path d="M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 01.02-.022z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 470 1000"
                fill="red"
                height="25px"
                width="25px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <path d="M452 656c12 12 18 26.333 18 43s-6 31-18 43c-12 10.667-26.333 16-43 16s-31-5.333-43-16L234 590 102 742c-12 10.667-26.333 16-43 16s-31-5.333-43-16C5.333 730 0 715.667 0 699s5.333-31 16-43l138-156L16 342C5.333 330 0 315.667 0 299s5.333-31 16-43c12-10.667 26.333-16 43-16s31 5.333 43 16l132 152 132-152c12-10.667 26.333-16 43-16s31 5.333 43 16c12 12 18 26.333 18 43s-6 31-18 43L314 500l138 156" />
              </svg>
            )}
          </div>
        </div>
        <div style={{ padding: 2 }} className="stat place-items-center">
          <div style={{ fontSize: 12, fontWeight: "bold" }} className="stat-title">
            B/Lister
          </div>
          <div className="stat-value">
            {isBlister ? (
              <svg
                fill="green"
                viewBox="0 0 16 16"
                height="25px"
                width="25px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <path d="M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 01.02-.022z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 470 1000"
                fill="red"
                height="25px"
                width="25px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <path d="M452 656c12 12 18 26.333 18 43s-6 31-18 43c-12 10.667-26.333 16-43 16s-31-5.333-43-16L234 590 102 742c-12 10.667-26.333 16-43 16s-31-5.333-43-16C5.333 730 0 715.667 0 699s5.333-31 16-43l138-156L16 342C5.333 330 0 315.667 0 299s5.333-31 16-43c12-10.667 26.333-16 43-16s31 5.333 43 16l132 152 132-152c12-10.667 26.333-16 43-16s31 5.333 43 16c12 12 18 26.333 18 43s-6 31-18 43L314 500l138 156" />
              </svg>
            )}
          </div>
        </div>
        <div style={{ padding: 2 }} className="stat place-items-center">
          <div style={{ fontSize: 12, fontWeight: "bold" }} className="stat-title">
            Minter
          </div>
          <div className="stat-value">
            {isMinter ? (
              <svg
                fill="green"
                viewBox="0 0 16 16"
                height="25px"
                width="25px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <path d="M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 01.02-.022z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 470 1000"
                fill="red"
                height="25px"
                width="25px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <path d="M452 656c12 12 18 26.333 18 43s-6 31-18 43c-12 10.667-26.333 16-43 16s-31-5.333-43-16L234 590 102 742c-12 10.667-26.333 16-43 16s-31-5.333-43-16C5.333 730 0 715.667 0 699s5.333-31 16-43l138-156L16 342C5.333 330 0 315.667 0 299s5.333-31 16-43c12-10.667 26.333-16 43-16s31 5.333 43 16l132 152 132-152c12-10.667 26.333-16 43-16s31 5.333 43 16c12 12 18 26.333 18 43s-6 31-18 43L314 500l138 156" />
              </svg>
            )}
          </div>
        </div>
        <div style={{ padding: 2 }} className="stat place-items-center">
          <div style={{ fontSize: 12, fontWeight: "bold" }} className="stat-title">
            Rescuer
          </div>
          <div className="stat-value">
            {isRescuer ? (
              <svg
                fill="green"
                viewBox="0 0 16 16"
                height="25px"
                width="25px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <path d="M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 01.02-.022z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 470 1000"
                fill="red"
                height="25px"
                width="25px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <path d="M452 656c12 12 18 26.333 18 43s-6 31-18 43c-12 10.667-26.333 16-43 16s-31-5.333-43-16L234 590 102 742c-12 10.667-26.333 16-43 16s-31-5.333-43-16C5.333 730 0 715.667 0 699s5.333-31 16-43l138-156L16 342C5.333 330 0 315.667 0 299s5.333-31 16-43c12-10.667 26.333-16 43-16s31 5.333 43 16l132 152 132-152c12-10.667 26.333-16 43-16s31 5.333 43 16c12 12 18 26.333 18 43s-6 31-18 43L314 500l138 156" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
