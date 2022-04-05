const template = `
  <div className="h-screen w-full overflow-hidden">
    <div className="flex flex-row h-full">
      <div className="basis-2/5 p-4">
        <div className="flex justify-between flex-col h-full">
          <ul className="steps steps-vertical w-full">
            <li data-content="✓" className="step step-primary">Install</li>
            <li data-content="✕" className="step step-primary step-error">
              Software license Agreement
            </li>
            <li data-content="●" className="step">Installing Setting</li>
            <li data-content="●" className="step">
              Preinstallation Summary
            </li>
            <li data-content="●" className="step">
              Preinstallation Summary
            </li>
            <li data-content="●" className="step">Installing</li>
            <li data-content="●" className="step">Installation Complete</li>
            <li data-content="●" className="step">Finalize Settings</li>
          </ul>
          <div className="mt-auto help p-2">
            <div className="flex items-center cursor-pointer">
              <p className="ml-2">Help</p>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-3/5 bg-white p-4 overflow-auto">
        <div className="space-y-4">
          <p className="text-lg font-semibold text-black">- Button</p>
          <div className="space-x-4">
            <button className="btn btn-primary loading">loading</button>
            <button className="btn btn-primary btn-sm">Small</button>
          </div>
        </div>
        <div className="divider"></div>
        <div className="space-y-4">
          <p className="text-lg font-semibold text-black">- Upload file</p>
        </div>
        <div className="divider"></div>
        <div className="space-y-4">
          <p className="text-lg font-semibold text-black">- Process</p>
          <progress className="progress progress-primary w-full"></progress>
          <progress
            className="progress progress-primary w-full"
            value="40"
            max="100"
          ></progress>
            </div>
            <div className="divider"></div>
            <div className="space-y-4">
              <p className="text-lg font-semibold text-black">- Text</p>
              <div>
                <p className="text-sm text-black">-- Description</p>
                <p className="text-xs text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur
                </p>
              </div>
              <div>
                <p className="text-sm text-black">-- Link</p>
                <a href="#" className="text-sm underline text-sky-600">
                  Bonorum et Malorum
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

module.exports = {
  template,
  data() {
    return {};
  },
};
