import { memo, useState } from 'react';

import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Skeleton from '../Skeleton';

pdfjs.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';

interface FileWithId extends File {
    id: string;
}

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

function RenderPdf({ file }: { file: FileWithId }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Skeleton isLoaded={isLoaded}>
            <div className="min-w-[130px] min-h-[184px] flex justify-center items-center">
                <Document
                    file={URL.createObjectURL(file)}
                    loading={null}
                    options={options}
                    onLoadSuccess={() => setIsLoaded(true)}
                >
                    <Page height={184} pageNumber={1} renderTextLayer={false} width={130} />
                </Document>
            </div>
        </Skeleton>
    );
}

export default memo(RenderPdf);
