---
title: 'Building Effective Detection Rules for Your SOC'
excerpt: 'Master the art of creating detection rules that catch real threats while minimizing false positives. Learn techniques used by top Security Operations Centers.'
coverImage: '/assets/blog/preview/cover.jpg'
date: '2024-09-15T05:00:00.000Z'
author:
  name: Pi Sigma Team
  picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---

## The Challenge of Detection Engineering

Building effective detection rules is both an art and a science. Too strict, and you miss threats. Too loose, and you drown in false positives.

## Understanding the Detection Pyramid

```
         Advanced Persistent Threats
              ↑
         Targeted Attacks
              ↑
         Common Exploits
              ↑
    Known Malware & Techniques
              ↑
         Anomalous Behavior
```

## Sigma Rules: The Universal Format

Sigma is a generic signature format for SIEM systems. Here's a practical example:

```yaml
title: Suspicious PowerShell Execution
id: 1f49f2ab-26bc-48b3-96cc-dcffbc93eadf
status: experimental
description: Detects suspicious PowerShell command execution
author: Pi Sigma Team
date: 2024/09/15
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    Image|endswith: '\powershell.exe'
    CommandLine|contains:
      - '-enc'
      - '-encoded'
      - '-nop'
      - '-w hidden'
  condition: selection
falsepositives:
  - Administrative scripts
  - Legitimate automation
level: medium
```

## Detection Rule Categories

### 1. Signature-Based Detection

Detect known threats using IOCs:

```yaml
title: Known Malware Hash Detection
detection:
  selection:
    Hashes|contains:
      - '44d88612fea8a8f36de82e1278abb02f'  # EICAR test hash
      - 'da39a3ee5e6b4b0d3255bfef95601890'
  condition: selection
level: high
```

### 2. Behavioral Detection

Identify suspicious patterns:

```yaml
title: Credential Dumping Attempt
detection:
  selection:
    EventID: 4656
    ObjectName|contains: '\lsass.exe'
    AccessMask: '0x1010'
  condition: selection
level: critical
```

### 3. Anomaly Detection

Spot deviations from baseline:

```python
# Example: Detecting unusual login times
from datetime import datetime

def detect_unusual_login(user_id, login_time):
    normal_hours = range(9, 18)  # 9 AM - 6 PM
    
    if login_time.hour not in normal_hours:
        alert(f"Unusual login time for user {user_id}")
        
    # Check for impossible travel
    if rapid_location_change(user_id):
        alert(f"Impossible travel detected for user {user_id}")
```

## Testing Your Detection Rules

Always test rules before deployment:

```bash
# Using Sigma CLI
sigma convert -t splunk rule.yml

# Test with sample data
sigma check -r ./rules/ -l ./logs/sample.json
```

## Reducing False Positives

### Tuning Techniques

1. **Add exclusions for known-good processes**
```yaml
detection:
  selection:
    # ... detection logic
  filter:
    User|contains: 'SYSTEM'
    ParentImage|endswith: '\svchost.exe'
  condition: selection and not filter
```

2. **Implement correlation**
```yaml
title: Multiple Failed Logins Followed by Success
detection:
  failed_logins:
    EventID: 4625
    TargetUserName: '*'
  successful_login:
    EventID: 4624
    TargetUserName: '*'
  timeframe: 5m
  condition: failed_logins | count(TargetUserName) > 5 and successful_login
```

3. **Use threat intelligence**
```python
def enrich_with_threat_intel(event):
    ip = event['source_ip']
    
    # Check against threat feeds
    if ip in known_malicious_ips:
        event['threat_level'] = 'high'
    elif ip in tor_exit_nodes:
        event['threat_level'] = 'medium'
    
    return event
```

## Detection-as-Code Best Practices

Treat detection rules like code:

```bash
# Version control
git add detection-rules/
git commit -m "Add PowerShell execution detection"

# CI/CD pipeline
- validate_syntax
- check_for_duplicates  
- test_against_samples
- deploy_to_production
```

## Measuring Detection Effectiveness

Key metrics to track:

- **Detection Rate**: Percentage of threats caught
- **False Positive Rate**: Invalid alerts per day
- **Mean Time to Detect (MTTD)**: Average detection time
- **Alert Fatigue Index**: Analyst workload

## Real-World Example

Here's a complete detection rule for detecting lateral movement:

```yaml
title: Lateral Movement via PsExec
id: f3f3a972-f982-40ad-b63c-bca6afaea0aa
status: stable
description: Detects PsExec service installation indicating lateral movement
references:
  - https://attack.mitre.org/techniques/T1021/002/
logsource:
  product: windows
  service: system
detection:
  selection:
    EventID: 7045
    ServiceFileName|contains: 'PSEXESVC'
  condition: selection
falsepositives:
  - Legitimate administrative activity
level: high
tags:
  - attack.lateral_movement
  - attack.t1021.002
```

## Continuous Improvement

Detection engineering is iterative:

1. **Deploy** initial rule
2. **Monitor** for false positives
3. **Tune** based on feedback
4. **Update** with new TTPs
5. **Repeat**

## Conclusion

Effective detection rules balance coverage with accuracy. Start with high-confidence detections, measure results, and continuously refine based on your environment.

---

**Need help building a world-class SOC?** [Contact Pi Sigma](https://www.pisigma.io/) for custom detection engineering services.
