function RefundPolicy() {
    document.title = 'Refund Policy | GoZupees';
    return (
        <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md bg-background mt-5">
            <h2 className="text-2xl font-semibold text-center mb-6">Refund Policy</h2>
            <p className="text-justify mb-4">
                We strive to provide the best services and products to our customers. If, for any
                reason, you are not entirely satisfied with your purchase, we are here to help.
                Please read the following terms regarding our refund policy.
            </p>
            <h3 className="text-xl font-semibold mb-4">Eligibility for Refund</h3>
            <p className="text-justify mb-4">
                To be eligible for a refund, your request must meet certain criteria:
                <ul className="list-disc ml-5">
                    <li>
                        The product must be unused and in the same condition that you received it.
                    </li>
                    <li>
                        Your refund request must be made within 30 days of the original purchase
                        date.
                    </li>
                    <li>Services that have already been rendered are not eligible for a refund.</li>
                </ul>
            </p>
            <h3 className="text-xl font-semibold mb-4">Changes to the Refund Policy</h3>
            <p className="text-justify mb-4">
                We reserve the right to modify or update this refund policy at any time without
                prior notice. Any changes will be posted on this page, and it is your responsibility
                to review this policy periodically.
            </p>
            <p className="text-justify">
                If you have any questions about our refund policy, please contact us..
            </p>
        </div>
    );
}

export default RefundPolicy;
