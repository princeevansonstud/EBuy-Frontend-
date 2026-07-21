export default function Footer() {
    return (
        <footer className="bg-slate-800 border-t border-slate-700 text-slate-400 text-xs py-4 text-center mt-auto">
            &copy; {new Date().getFullYear()} EBuy. All rights reserved.
        </footer>
    );
}