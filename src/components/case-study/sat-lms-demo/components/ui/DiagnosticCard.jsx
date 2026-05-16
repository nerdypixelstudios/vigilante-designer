import DiagnosticBox from './DiagnosticBox';

export default function DiagnosticCard({ config, id, onTakeDiagnostic, ...rest }) {
  return (
    <div id={id}>
      <DiagnosticBox
        diagnosticConfig={config}
        onTakeDiagnostic={onTakeDiagnostic}
        onViewResults={onTakeDiagnostic}
        {...rest}
      />
    </div>
  );
}
