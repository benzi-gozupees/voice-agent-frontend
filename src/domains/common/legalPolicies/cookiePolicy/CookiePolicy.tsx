function CookiePolicy() {
    document.title = 'Cookie Policy | GoZupees';
    return (
        <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md bg-background mt-5">
            <h2 className="text-2xl font-semibold text-center mb-6">Cookie Policy</h2>
            <p className="text-justify mb-4">
                Our website uses cookies to enhance your browsing experience. By continuing to use
                our site, you consent to the use of cookies in accordance with this policy.
            </p>
            <h3 className="text-xl font-semibold mb-4">What Are Cookies?</h3>
            <p className="text-justify mb-4">
                Cookies are small text files that are stored on your device when you visit a
                website. They help us remember your preferences and improve site functionality.
            </p>
            <h3 className="text-xl font-semibold mb-4">How We Use Cookies</h3>
            <p className="text-justify mb-4">
                We use cookies to:
                <ul className="list-disc ml-5">
                    <li>Remember your preferences and settings</li>
                    <li>Analyze site traffic and usage</li>
                    <li>Provide a more personalized experience</li>
                </ul>
            </p>
            <h3 className="text-xl font-semibold mb-4">Managing Cookies</h3>
            <p className="text-justify mb-4">
                You can control and manage cookies through your browser settings. Please note that
                disabling cookies may affect the functionality of our website.
            </p>
            <p className="text-justify">
                For more information about our use of cookies, please contact us.
            </p>
        </div>
    );
}

export default CookiePolicy;
