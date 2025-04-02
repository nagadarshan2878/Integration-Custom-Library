export class SessionTimeoutPopup {
  static showSessionTimeoutPopup()
  {
      // Remove existing modal if any
      const existingModal = document.getElementById("sessionTimeoutModal");
      if (existingModal) {
        document.body.removeChild(existingModal);
      }
  
      // Create the modal overlay
      const modal = document.createElement("div");
      modal.id = "sessionTimeoutModal";
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "1000";
  
      // Modal content container
      const modalContent = document.createElement("div");
      modalContent.style.background = "#fff";
      modalContent.style.padding = "25px";
      modalContent.style.borderRadius = "10px";
      modalContent.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.2)";
      modalContent.style.textAlign = "center";
      modalContent.style.width = "400px";
      modalContent.style.fontFamily = "Arial, sans-serif";
  
      // Warning icon
      const icon = document.createElement("div");
      icon.innerHTML = "&#9888;"; // Warning symbol
      icon.style.fontSize = "50px";
      icon.style.color = "#60B51D";
      icon.style.marginBottom = "10px";
  
      // Title text
      const title = document.createElement("h2");
      title.innerText = "Session Timeout Alert";
      title.style.margin = "0";
      title.style.color = "#333";
      title.style.fontSize = "22px";
  
      // Expiry message
      const message = document.createElement("p");
      message.innerText = "Your session will expire in 1 Sec";
      message.style.margin = "10px 0";
      message.style.color = "#666";
      message.style.fontSize = "16px";
  
      // Button container
      // const buttonContainer = document.createElement("div");
      // buttonContainer.style.display = "flex";
      // buttonContainer.style.justifyContent = "space-between";
      // buttonContainer.style.marginTop = "20px";
  
      // Logout button
      // const logoutButton = document.createElement("button");
      // logoutButton.innerText = "Logout";
      // logoutButton.style.padding = "12px 20px";
      // logoutButton.style.border = "1px solid #ccc";
      // logoutButton.style.borderRadius = "25px";
      // logoutButton.style.background = "#fff";
      // logoutButton.style.color = "#333";
      // logoutButton.style.cursor = "pointer";
      // logoutButton.style.flex = "1";
      // logoutButton.style.marginRight = "10px";
      // logoutButton.onclick = function () {
      //   document.body.removeChild(modal);
      //   sessionStorage.clear();
      //   window.location.href = "http://localhost:4200/login";
      // };
  
      // Keep logged in button
      // const keepLoggedInButton = document.createElement("button");
      // keepLoggedInButton.innerText = "Keep me logged in";
      // keepLoggedInButton.style.padding = "12px 20px";
      // keepLoggedInButton.style.border = "none";
      // keepLoggedInButton.style.borderRadius = "25px";
      // keepLoggedInButton.style.background = "red";
      // keepLoggedInButton.style.color = "#fff";
      // keepLoggedInButton.style.cursor = "pointer";
      // keepLoggedInButton.style.flex = "1";
      // keepLoggedInButton.onclick = function () {
      //   document.body.removeChild(modal);
      // };
  
      // Append elements
      // buttonContainer.appendChild(logoutButton);
      // buttonContainer.appendChild(keepLoggedInButton);
      modalContent.appendChild(icon);
      modalContent.appendChild(title);
      modalContent.appendChild(message);
      // modalContent.appendChild(buttonContainer);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    }
  }
  