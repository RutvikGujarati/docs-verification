// IPFSComponent.jsx
import React, { useState } from 'react';

function IPFSComponent({ handleGetIPFSContent }) {
    const [ipfsHash, setIpfsHash] = useState('');
    const [content, setContent] = useState('');

    const handleInputChange = (e) => {
        setIpfsHash(e.target.value);
    };

    const handleGetContent = async () => {
        try {
            const result = await handleGetIPFSContent(ipfsHash);
            setContent(result);
        } catch (error) {
            setContent(`Error fetching content: ${error.message}`);
        }
    };

    return (
        <div>
            <label>
                Enter IPFS Hash:
                <input type="text" value={ipfsHash} onChange={handleInputChange} />
            </label>
            <button onClick={handleGetContent}>Get Content</button>

            <div>
                <strong>Content:</strong>
                <pre>{content}</pre>
            </div>
        </div>
    );
}

export default IPFSComponent;
