const enableAeosUpdate = false 

        function setCookie(name, value, days) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

        function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function showAeosUpdateOverlay(message = "Aeos is updating.", buttonText = "OK") {
            const cookieName = "aeosUpdateOverlayClosed";

            if (getCookie(cookieName)) {
                console.log("Aeos update overlay cookie found. Not displaying the overlay.");
                return;
            }

            if (document.getElementById('aeosUpdateOverlay')) {
                console.warn('Aeos update overlay already exists. Not creating a new one.');
                return;
            }

            const originalBodyOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';

            const overlay = document.createElement('div');
            overlay.id = 'aeosUpdateOverlay';
            Object.assign(overlay.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '9999',
                backdropFilter: 'blur(8px)', 
                WebkitBackdropFilter: 'blur(8px)', 
                opacity: '0', 
                transition: 'opacity 0.5s ease-in-out' 
            });

            const messageBox = document.createElement('div');
            Object.assign(messageBox.style, {
                backgroundColor: '#1a1a1a', 
                padding: '2.5rem',
                borderRadius: '1rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)', 
                textAlign: 'center',
                color: '#e0e0e0', 
                maxWidth: '90%',
                width: '400px',
                transform: 'scale(0.9)', 
                transition: 'transform 0.5s ease-in-out' 
            });

            const heading = document.createElement('h2');
            heading.textContent = message;
            Object.assign(heading.style, {
                fontSize: '2.25rem',
                fontWeight: '700',
                marginBottom: '0.75rem', 
                color: '#60a5fa' 
            });

            const subText = document.createElement('p');
            subText.textContent = "Things may not work as intended.";
            Object.assign(subText.style, {
                fontSize: '1rem', 
                color: '#ffffff', 
                marginBottom: '1.5rem' 
            });

            const okButton = document.createElement('button');
            okButton.id = 'aeosOkButton';
            okButton.textContent = buttonText;
            Object.assign(okButton.style, {
                backgroundColor: '#3b82f6', 
                color: 'white',
                padding: '0.75rem 2rem',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1.125rem',
                fontWeight: '600',
                transition: 'background-color 0.3s ease, transform 0.2s ease' 
            });

            okButton.addEventListener('mouseover', () => {
                okButton.style.backgroundColor = '#2563eb'; 
                okButton.style.transform = 'translateY(-2px)'; 
            });
            okButton.addEventListener('mouseout', () => {
                okButton.style.backgroundColor = '#3b82f6'; 
                okButton.style.transform = 'translateY(0)'; 
            });
            okButton.addEventListener('mousedown', () => {
                okButton.style.transform = 'translateY(0)'; 
            });
            okButton.addEventListener('mouseup', () => {
                okButton.style.transform = 'translateY(-2px)'; 
            });

            okButton.addEventListener('click', () => {

                setCookie(cookieName, "true", 0.1); 

                overlay.style.opacity = '0';
                messageBox.style.transform = 'scale(0.9)';

                overlay.addEventListener('transitionend', () => {
                    overlay.remove();

                    document.body.style.overflow = originalBodyOverflow;
                }, { once: true }); 
            });

            messageBox.appendChild(heading);
            messageBox.appendChild(subText); 
            messageBox.appendChild(okButton);
            overlay.appendChild(messageBox);

            document.body.appendChild(overlay);

            setTimeout(() => {
                overlay.style.opacity = '1';
                messageBox.style.transform = 'scale(1)';
            }, 50);
        }

        document.addEventListener('DOMContentLoaded', () => {
            const triggerElement = document.getElementById('aeos-update-trigger');
            if (triggerElement && enableAeosUpdate) {
                showAeosUpdateOverlay();
            }
        });

        function setCookie(name, value, days) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

        function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        document.addEventListener('DOMContentLoaded', () => {
            const cookieName = "announcementBarClosed";

            if (getCookie(cookieName)) {
                console.log("Announcement bar cookie found. Not displaying the bar.");
                return; 
            }

            function createAnnouncementBar(message) {

                const announcementBar = document.createElement('div');
                announcementBar.id = 'announcement-bar';

                announcementBar.className = 'announcement-bar';

                const messageSpan = document.createElement('span');
                messageSpan.textContent = message;
                messageSpan.className = 'message';

                const closeButton = document.createElement('button');
                closeButton.innerHTML = `
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                `;
                closeButton.className = 'close-button';

                closeButton.addEventListener('click', () => {

                    setCookie(cookieName, "true", 0.1); 

                    announcementBar.style.transform = 'translateY(-100%)';
                    announcementBar.style.opacity = '0';

                    announcementBar.addEventListener('transitionend', () => {
                        announcementBar.remove();

                        document.body.style.marginTop = '0';
                    }, { once: true }); 
                });

                announcementBar.appendChild(messageSpan);
                announcementBar.appendChild(closeButton);

                document.body.prepend(announcementBar);

                setTimeout(() => {
                    const barHeight = announcementBar.offsetHeight;
                    document.body.style.marginTop = `${barHeight}px`;
                }, 50); 
            }

        });