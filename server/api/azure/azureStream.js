const {
    BlobServiceClient,
    StorageSharedKeyCredential,
    newPipeline,
    BlobSASPermissions,
} = require('@azure/storage-blob');

var fs = require('fs');

const accountName = process.env.AZURE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_ACCOUNT_KEY;

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const pipeline = newPipeline(sharedKeyCredential);

const blobServiceClient = new BlobServiceClient(
    //`https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
    `https://${accountName}.blob.core.windows.net`,
    pipeline
);

module.exports = async (req, res) => {
    const blobName = req.query.fileName;
    const containerClient = blobServiceClient.getContainerClient(accountName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
        const permissions = BlobSASPermissions.parse('r');
        const expiresOn = new Date();
        expiresOn.setMinutes(expiresOn.getMinutes() + 10);

        const sasUrl = await blockBlobClient.generateSasUrl({ permissions: permissions, expiresOn: expiresOn });
        var response = res.status(200).send(sasUrl);
        return response;
    } catch (err) {
        console.log('API call failed, reason ', err.message);
        return res.status(400).send({ error: err.message });
    }
};