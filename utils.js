/** @param {NS} ns **/
export function multiscan(ns, server) {
	// Initialize an empty array to store the list of scanned servers.
	let serverList = [];

	// Define a recursive function to scan servers and their neighbors.
	function scanning(server) {
		// Get a list of all servers directly connected to the current server.
		let currentScan = ns.scan(server);

		// Iterate through each server found in the current scan.
		currentScan.forEach(server => {
			// Check if this server has already been added to our list.
			if (!serverList.includes(server)) {
				// If the server is not in the list, add it.
				serverList.push(server);
				// Recursively call the scanning function on this newly found server
				// to explore its connected servers. This is how we traverse the network.
				scanning(server);
			}
		})
	}

	// Start the scanning process from the initial 'server' provided as input.
	scanning(server);

	// After the scanning is complete, return the list of all reachable servers.
	return serverList;
}

/** @param {NS} ns **/
export function gainRootAccess(ns, server) {
	// Get detailed information about the target server.
	const serverData = ns.getServer(server);

	// Attempt to use various hacking programs if they exist on your system.
	// Each 'if' statement checks if a specific program file exists.
	if (ns.fileExists('brutessh.exe')) {
		ns.brutessh(server); // Use the BruteSSH program to open an SSH port.
	}
	if (ns.fileExists('ftpcrack.exe')) {
		ns.ftpcrack(server);   // Use the FTPCrack program to open an FTP port.
	}
	if (ns.fileExists('relaysmtp.exe')) {
		ns.relaysmtp(server); // Use the relaySMTP program to open an SMTP port.
	}
	if (ns.fileExists('httpworm.exe')) {
		ns.httpworm(server);  // Use the HTTPWorm program to open an HTTP port.
	}
	if (ns.fileExists('sqlinject.exe')) {
		ns.sqlinject(server); // Use the SQLInject program to open an SQL port.
	}

	// Check if the number of open ports on the target server is greater than or
	// equal to the number of required ports to run the nuke program.
	if (ns.getServerNumPortsRequired(server) <= serverData.openPortCount) {
		ns.nuke(server); // Use the nuke program to gain root access.
	}

	/* Requires Singularity 4-1
	if (!serverData.backdoorInstalled) {
		ns.installBackdoor(server);
	}
	*/
	// The commented-out section above would install a backdoor on the server
	// if it's not already installed. This typically requires a higher level
	// of the Singularity augment and being physically on the server.
}
