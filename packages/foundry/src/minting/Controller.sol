// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {Ownable} from "../Ownable.sol";

/**
 * @title Controller
 * @notice Generic implementation of the owner-controller-worker model.
 * One owner manages many controllers. Each controller manages one worker.
 * Workers may be reused across different controllers.
 */
contract Controller is Ownable {
    /**
     * @notice A controller manages a single worker address.
     * controllers[controller] = worker
     */
    mapping(address => address) internal controllers;

    event ControllerConfigured(address indexed _controller, address indexed _worker);
    event ControllerRemoved(address indexed _controller);

    /**
     * @notice Ensures that caller is the controller of a non-zero worker
     * address.
     */
    modifier onlyController() {
        require(controllers[msg.sender] != address(0), "The value of controllers[msg.sender] must be non-zero");
        _;
    }

    /**
     * @notice Gets the worker at address _controller.
     */
    function getWorker(address _controller) external view returns (address) {
        return controllers[_controller];
    }

    // onlyOwner functions

    /**
     * @notice Configure a controller with the given worker.
     * @param _controller The controller to be configured with a worker.
     * @param _worker The worker to be set for the newly configured controller.
     * _worker must not be a non-zero address. To disable a worker,
     * use removeController instead.
     */
    function configureController(address _controller, address _worker) public onlyOwner {
        require(_controller != address(0), "Controller must be a non-zero address");
        require(_worker != address(0), "Worker must be a non-zero address");
        controllers[_controller] = _worker;
        emit ControllerConfigured(_controller, _worker);
    }

    /**
     * @notice disables a controller by setting its worker to address(0).
     * @param _controller The controller to disable.
     */
    function removeController(address _controller) public onlyOwner {
        require(_controller != address(0), "Controller must be a non-zero address");
        require(controllers[_controller] != address(0), "Worker must be a non-zero address");
        controllers[_controller] = address(0);
        emit ControllerRemoved(_controller);
    }
}
