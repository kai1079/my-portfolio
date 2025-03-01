export const BackgroundVideo: React.FC = () => (
    <div className="absolute w-full h-full overflow-hidden">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-100">
            <source src="/images/assets/background.mp4" type="video/mp4" />
        </video>
    </div>
);