// export class IdleTimeoutPopup {
//     static showIdleTimeoutPopup()
//     {
//         // Remove existing modal if any
//         const existingModal = document.getElementById("IdleTimeoutModal");
//         if (existingModal) {
//           document.body.removeChild(existingModal);
//         }
    
//         // Create the modal overlay
//         const modal = document.createElement("div");
//         modal.id = "IdleTimeoutModal";
//         modal.style.position = "fixed";
//         modal.style.top = "0";
//         modal.style.left = "0";
//         modal.style.width = "100%";
//         modal.style.height = "100%";
//         modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
//         modal.style.display = "flex";
//         modal.style.justifyContent = "center";
//         modal.style.alignItems = "center";
//         modal.style.zIndex = "1000";
    
//         // Modal content container
//         const modalContent = document.createElement("div");
//         modalContent.style.background = "#fff";
//         modalContent.style.padding = "25px";
//         modalContent.style.borderRadius = "10px";
//         modalContent.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.2)";
//         modalContent.style.textAlign = "center";
//         modalContent.style.width = "400px";
//         modalContent.style.fontFamily = "Arial, sans-serif";
    
//         // Warning icon
//         const icon = document.createElement("div");
//         icon.innerHTML = "&#9888;"; // Warning symbol
//         icon.style.fontSize = "50px";
//         icon.style.color = "red";
//         icon.style.marginBottom = "10px";
    
//         // Title text
//         const title = document.createElement("h2");
//         title.innerText = "Session Timeout Alert";
//         title.style.margin = "0";
//         title.style.color = "#333";
//         title.style.fontSize = "22px";
    
//         // Expiry message
//         const message = document.createElement("p");
//         message.innerText = "Your session will expire in 0 Sec";
//         message.style.margin = "10px 0";
//         message.style.color = "#666";
//         message.style.fontSize = "16px";
    
//         // Button container
//         const buttonContainer = document.createElement("div");
//         buttonContainer.style.display = "flex";
//         buttonContainer.style.justifyContent = "space-between";
//         buttonContainer.style.marginTop = "20px";
    
//         // Logout button
//         const logoutButton = document.createElement("button");
//         logoutButton.innerText = "Logout";
//         logoutButton.style.padding = "12px 20px";
//         logoutButton.style.border = "1px solid #ccc";
//         logoutButton.style.borderRadius = "25px";
//         logoutButton.style.background = "#fff";
//         logoutButton.style.color = "#333";
//         logoutButton.style.cursor = "pointer";
//         logoutButton.style.flex = "1";
//         logoutButton.style.marginRight = "10px";
//         logoutButton.onclick = function () {
//           document.body.removeChild(modal);
//           sessionStorage.clear();
//           window.location.href = "http://localhost:4200/login";
//         };
    
//         // Keep logged in button
//         const keepLoggedInButton = document.createElement("button");
//         keepLoggedInButton.innerText = "Keep me logged in";
//         keepLoggedInButton.style.padding = "12px 20px";
//         keepLoggedInButton.style.border = "none";
//         keepLoggedInButton.style.borderRadius = "25px";
//         keepLoggedInButton.style.background = "red";
//         keepLoggedInButton.style.color = "#fff";
//         keepLoggedInButton.style.cursor = "pointer";
//         keepLoggedInButton.style.flex = "1";
//         keepLoggedInButton.onclick = function () {
//           document.body.removeChild(modal);
//         };
    
//         // Append elements
//         buttonContainer.appendChild(logoutButton);
//         buttonContainer.appendChild(keepLoggedInButton);
//         modalContent.appendChild(icon);
//         modalContent.appendChild(title);
//         modalContent.appendChild(message);
//         modalContent.appendChild(buttonContainer);
//         modal.appendChild(modalContent);
//         document.body.appendChild(modal);
//       }
//     }
import { IdleTimeout } from './IdleTimeout';
import { LivezyIdleTimeout } from './LivezyIdleTimeout';
import { ShareDataService} from './ShareDataService';
export class IdleTimeoutPopup {
    static showIdleTimeoutPopup(appType:any) {
        console.log(appType);
        const existingModal = document.getElementById("IdleTimeoutModal");
        if (existingModal) {
            document.body.removeChild(existingModal);
        }

        // Create the modal overlay
        const modal = document.createElement("div");
        modal.id = "IdleTimeoutModal";
        Object.assign(modal.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
        });

        // Modal content container
        const modalContent = document.createElement("div");
        Object.assign(modalContent.style, {
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            textAlign: "center",
            width: "420px",
            fontFamily: "Arial, sans-serif",
        });

        // Warning icon
        const icon = document.createElement("div");
        icon.innerHTML = "&#9888;"; // Warning symbol
        Object.assign(icon.style, {
            fontSize: "50px",
            color: "#60B51D",
            marginBottom: "15px",
        });

        // Title text
        const title = document.createElement("h2");
        title.innerText = "Idle Timeout";
        Object.assign(title.style, {
            margin: "0",
            color: "#333",
            fontSize: "22px",
        });

        // Expiry message
        // const message = document.createElement("p");
        // message.innerText = `Your session will expire in ${remainingTime} Sec`;
        // Object.assign(message.style, {
        //     margin: "10px 0",
        //     color: "#666",
        //     fontSize: "16px",
        // });

        // Update the countdown
        // const updateCountdown = () => {
        //     if (remainingTime > 0) {
        //         remainingTime--;
        //         message.innerText = `Your session will expire in ${remainingTime} Sec`;
        //         setTimeout(updateCountdown, 1000);
        //     }
        // };
        // setTimeout(updateCountdown, 1000);

        // Button container
        const buttonContainer = document.createElement("div");
        Object.assign(buttonContainer.style, {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
        });

        // Logout button
        const logoutButton = document.createElement("button");
        logoutButton.innerText = "Logout";
        Object.assign(logoutButton.style, {
            padding: "12px 20px",
            border: "1px solid #ccc",
            borderRadius: "25px",
            background: "#fff",
            color: "#333",
            cursor: "pointer",
            flex: "1",
            marginRight: "10px",
        });
        logoutButton.onclick = function () {
            document.body.removeChild(modal);
            sessionStorage.clear();
            const shareDataService = new ShareDataService();
            shareDataService.clearAllCookies();
            window.location.href = "http://localhost:4200/login"; // Change to your login URL
        };

        // Keep logged in button
        const keepLoggedInButton = document.createElement("button");
        keepLoggedInButton.innerText = "Stay Connected";
        Object.assign(keepLoggedInButton.style, {
            padding: "12px 20px",
            border: "none",
            borderRadius: "25px",
            background: "#60B51D",
            color: "#fff",
            cursor: "pointer",
            flex: "1",
        });
        keepLoggedInButton.onclick = function () {
            document.body.removeChild(modal);
            console.log('Stay Connected');
            if(appType=="obdx")
            {   
                console.log("Obdx Popup");
                const idleInstance = new IdleTimeout();
                idleInstance.callIdleApi();
            }
            else
            { 
                console.log("Livezy Popup");
                const livezyIdleTimeout = new LivezyIdleTimeout();
                livezyIdleTimeout.callIdleTimepoutApi();
            }
           
            // IdleTimeout.callIdleApi();
        };

        // Append elements
        buttonContainer.appendChild(logoutButton);
        buttonContainer.appendChild(keepLoggedInButton);
        modalContent.appendChild(icon);
        modalContent.appendChild(title);
        // modalContent.appendChild(message);
        modalContent.appendChild(buttonContainer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }
}
