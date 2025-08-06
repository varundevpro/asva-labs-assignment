import { ConnectButton } from "@rainbow-me/rainbowkit";
import clsx from "clsx";
import { Link, NavLink } from "react-router";

function MyConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        const btnClassName =
          "inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none";

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className={btnClassName}
                  >
                    <span>
                      Connect <span className="hidden md:inline">Wallet</span>
                    </span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={btnClassName}
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="inline-flex gap-3">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5"
                  >
                    {chain.hasIcon && (
                      <div
                        className="w-4 h-4 rounded-full overflow-hidden mr-1"
                        style={{
                          background: chain.iconBackground,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            className="w-4 h-4"
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className={btnClassName}
                  >
                    {account.displayName}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""} */}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export function Header() {
  return (
    <header className="bg-white p-2 flex justify-between items-center rounded-xl shadow-lg">
      <div className="pl-2">
        <Link className="inline-flex items-center gap-1" to="/">
          <svg
            className="size-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.998 3V5C20.998 14.6274 15.6255 19 8.99805 19L7.0964 18.9999C7.3079 15.9876 8.24541 14.1648 10.6939 11.9989C11.8979 10.9338 11.7965 10.3189 11.2029 10.6721C7.1193 13.1016 5.09114 16.3862 5.00119 21.6302L4.99805 22H2.99805C2.99805 20.6373 3.11376 19.3997 3.34381 18.2682C3.1133 16.9741 2.99805 15.2176 2.99805 13C2.99805 7.47715 7.4752 3 12.998 3C14.998 3 16.998 4 20.998 3Z"></path>
          </svg>

          <span className="font-bold text-2xl">Asva</span>
        </Link>
      </div>

      <div className="flex justify-end items-center gap-2 md:gap-8">
        <NavLink
          to="/history"
          className={({ isActive }) =>
            clsx(
              "inline-flex md:hidden p-2 rounded-md  self-stretch justify-center items-center",
              isActive ? "text-blue-700" : "text-gray-600 hover:bg-gray-100"
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path>
          </svg>
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            clsx(
              "hidden md:inline-flex",
              isActive ? "text-blue-700" : "text-gray-500 hover:text-gray-800"
            )
          }
        >
          History
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            clsx(
              "hidden md:inline-flex",
              isActive ? "text-blue-700" : "text-gray-500 hover:text-gray-800"
            )
          }
        >
          Leaderboard
        </NavLink>

        <MyConnectButton />
      </div>
    </header>
  );
}
